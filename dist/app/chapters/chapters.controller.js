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
exports.updateChapter = exports.getChapterData = exports.getChapter = void 0;
const chapters_service_1 = require("./chapters.service");
// import { ChapterService } from "./chapter.service";
const chapterService = new chapters_service_1.ChapterService();
// Fetch a specific chapter
const getChapter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId, chapterId } = req.params;
    try {
        const chapter = yield chapterService.getChapterWithCompletion(courseId, chapterId);
        res.status(200).json({ status: "success", data: chapter });
    }
    catch (error) {
        console.error("[GET_CHAPTER]", error.message);
        res.status(500).json({ status: "error", message: error.message });
    }
});
exports.getChapter = getChapter;
// Fetch chapter data dynamically with userId
const getChapterData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { courseId, chapterId } = req.query; // Extract query parameters
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    // TypeScript type assertion to ensure values are strings
    if (typeof courseId !== "string" || typeof chapterId !== "string") {
        res
            .status(400)
            .json({ status: "error", message: "Invalid query parameters" });
        return;
    }
    try {
        // Call your service to fetch the data
        const chapterData = yield chapterService.getChapterData(userId, courseId, chapterId);
        const { chapter, course, muxData, attachments, nextChapter, userProgress, purchase, } = chapterData;
        // res.status(200).json({ status: "success", chapterData });
        res.status(200).json({
            status: "success",
            chapter,
            course,
            muxData,
            attachments,
            nextChapter,
            userProgress,
            purchase,
        });
    }
    catch (error) {
        console.error("[GET_CHAPTER_DATA]", error.message);
        res.status(500).json({ status: "error", message: error.message });
    }
});
exports.getChapterData = getChapterData;
// Update a specific chapter
const updateChapter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { courseId, chapterId } = req.params;
    const updateChapterDto = req.body;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    if (!userId) {
        res.status(401).json({ status: "error", message: "Unauthorized" });
        return;
    }
    try {
        const updatedChapter = yield chapterService.updateChapter(courseId, chapterId, updateChapterDto, userId);
        res.status(200).json({ status: "success", data: updatedChapter });
    }
    catch (error) {
        console.error("[UPDATE_CHAPTER]", error.message);
        res.status(500).json({ status: "error", message: error.message });
    }
});
exports.updateChapter = updateChapter;
