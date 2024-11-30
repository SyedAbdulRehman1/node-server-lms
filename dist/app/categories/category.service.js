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
exports.CategoryService = void 0;
const client_1 = require("@prisma/client");
class CategoryService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    getCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.prisma.category.findMany({
                    orderBy: { name: 'asc' },
                });
            }
            catch (error) {
                console.error('[GET_CATEGORIES]', error);
                throw { status: 500, message: 'Error fetching categories' };
            }
        });
    }
    getCourses(_a) {
        return __awaiter(this, arguments, void 0, function* ({ userId, title, categoryId, }) {
            try {
                const courses = yield this.prisma.course.findMany({
                    where: {
                        isPublished: true,
                        title: {
                            contains: title,
                        },
                        categoryId,
                    },
                    include: {
                        category: true,
                        chapters: {
                            where: {
                                isPublished: true,
                            },
                            select: {
                                id: true,
                            },
                        },
                        purchases: {
                            where: {
                                userId,
                            },
                        },
                    },
                    orderBy: {
                        createdAt: 'desc',
                    },
                });
                return yield Promise.all(courses.map((course) => __awaiter(this, void 0, void 0, function* () {
                    const progress = course.purchases.length > 0
                        ? yield this.getProgress(userId, course.id)
                        : null;
                    return Object.assign(Object.assign({}, course), { progress });
                })));
            }
            catch (error) {
                console.error('[GET_COURSES]', error);
                throw { status: 500, message: 'Error fetching courses' };
            }
        });
    }
    getProgress(userId, courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const publishedChapters = yield this.prisma.chapter.findMany({
                    where: {
                        courseId,
                        isPublished: true,
                    },
                    select: {
                        id: true,
                    },
                });
                const publishedChapterIds = publishedChapters.map((chapter) => chapter.id);
                const validCompletedChapters = yield this.prisma.userProgress.count({
                    where: {
                        userId,
                        chapterId: {
                            in: publishedChapterIds,
                        },
                        isCompleted: true,
                    },
                });
                return (validCompletedChapters / publishedChapterIds.length) * 100;
            }
            catch (error) {
                console.error('[GET_PROGRESS]', error);
                return 0;
            }
        });
    }
}
exports.CategoryService = CategoryService;
