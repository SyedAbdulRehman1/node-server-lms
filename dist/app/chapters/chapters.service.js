"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChapterService = void 0;
const client_1 = require("@prisma/client");
const muxService_1 = require("../../services/muxService");
const prisma = new client_1.PrismaClient();
class ChapterService {
    getChapterWithCompletion(courseId, chapterId) {
        return __awaiter(this, void 0, void 0, function* () {
            const chapter = yield prisma.chapter.findUnique({
                where: { id: chapterId },
                include: { muxData: true },
            });
            if (!chapter || chapter.courseId !== courseId) {
                throw new Error("Chapter not found or unauthorized access");
            }
            const requiredFields = [
                chapter.title,
                chapter.description,
                chapter.videoUrl,
            ];
            const completedFields = requiredFields.filter(Boolean).length;
            const totalFields = requiredFields.length;
            return {
                chapter,
                isComplete: completedFields === totalFields,
                completionText: `(${completedFields}/${totalFields})`,
            };
        });
    }
    getChapterData(userId, courseId, chapterId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const purchase = yield prisma.purchase.findUnique({
                    where: { userId_courseId: { userId, courseId } },
                });
                const course = yield prisma.course.findUnique({
                    where: { id: courseId, isPublished: true },
                    select: { price: true },
                });
                const chapter = yield prisma.chapter.findUnique({
                    where: { id: chapterId, isPublished: true },
                });
                if (!chapter || !course) {
                    throw new Error("Chapter or course not found");
                }
                let muxData = null;
                let attachments = [];
                let nextChapter = null;
                if (purchase) {
                    attachments = yield prisma.attachment.findMany({
                        where: { courseId },
                    });
                }
                if (chapter.isFree || purchase) {
                    muxData = yield prisma.muxData.findUnique({ where: { chapterId } });
                    nextChapter = yield prisma.chapter.findFirst({
                        where: {
                            courseId,
                            isPublished: true,
                            position: { gt: chapter.position },
                        },
                        orderBy: { position: "asc" },
                    });
                }
                const userProgress = yield prisma.userProgress.findUnique({
                    where: { userId_chapterId: { userId, chapterId } },
                });
                return {
                    chapter,
                    course,
                    muxData,
                    attachments,
                    nextChapter,
                    userProgress,
                    purchase,
                };
            }
            catch (error) {
                console.error("[GET_CHAPTER_DATA_SERVICE]", error.message);
                throw new Error("Internal Server Error");
            }
        });
    }
    updateChapter(courseId, chapterId, updateChapterDto, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const ownCourse = yield prisma.course.findFirst({
                where: { id: courseId, userId },
            });
            if (!ownCourse) {
                throw new Error("Unauthorized");
            }
            const chapter = yield prisma.chapter.update({
                where: { id: chapterId, courseId },
                data: updateChapterDto,
            });
            if (updateChapterDto.videoUrl) {
                yield (0, muxService_1.uploadVideoToMux)(updateChapterDto.videoUrl, chapterId);
            }
            return chapter;
        });
    }
    publishChapter(courseId, chapterId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const course = yield prisma.course.findUnique({
                where: {
                    id: courseId,
                    userId,
                },
            });
            if (!course) {
                const error = new Error("Unauthorized");
                error.status = 401;
                throw error;
            }
            const chapter = yield prisma.chapter.findUnique({
                where: {
                    id: chapterId,
                    courseId,
                },
            });
            if (!chapter ||
                !chapter.title ||
                !chapter.description ||
                !chapter.videoUrl) {
                const error = new Error("Missing required fields");
                error.status = 400;
                throw error;
            }
            return yield prisma.chapter.update({
                where: {
                    id: chapterId,
                },
                data: {
                    isPublished: true,
                },
            });
        });
    }
    unpublishChapter(courseId, chapterId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Verify if the user owns the course
                const ownCourse = yield prisma.course.findFirst({
                    where: {
                        id: courseId,
                        userId,
                    },
                });
                if (!ownCourse) {
                    throw "Unauthorized";
                }
                // Unpublish the chapter
                const unpublishedChapter = yield prisma.chapter.update({
                    where: {
                        id: chapterId,
                    },
                    data: {
                        isPublished: false,
                    },
                });
                const publishedChapters = yield prisma.chapter.findMany({
                    where: {
                        courseId: courseId,
                        isPublished: true,
                    },
                });
                if (publishedChapters.length === 0) {
                    yield prisma.course.update({
                        where: {
                            id: courseId,
                        },
                        data: {
                            isPublished: false,
                        },
                    });
                }
                return unpublishedChapter;
            }
            catch (error) {
                console.error("[UNPUBLISH_CHAPTER_ERROR]", error);
                throw new Error("Failed to unpublish chapter");
            }
        });
    }
}
exports.ChapterService = ChapterService;
