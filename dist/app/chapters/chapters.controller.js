"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.unpublishChapterHandler =
  exports.publishChapterHandler =
  exports.updateChapter =
  exports.getChapterData =
  exports.getChapter =
    void 0;
const chapters_service_1 = require("./chapters.service");
// import { ChapterService } from "./chapter.service";
const chapterService = new chapters_service_1.ChapterService();
// Fetch a specific chapter
const getChapter = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { courseId, chapterId } = req.params;
    try {
      const chapter = yield chapterService.getChapterWithCompletion(
        courseId,
        chapterId
      );
      res.status(200).json({ status: "success", data: chapter });
    } catch (error) {
      console.error("[GET_CHAPTER]", error.message);
      res.status(500).json({ status: "error", message: error.message });
    }
  });
exports.getChapter = getChapter;
const getChapterData = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
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
      const chapterData = yield chapterService.getChapterData(
        userId,
        courseId,
        chapterId
      );
      const {
        chapter,
        course,
        muxData,
        attachments,
        nextChapter,
        userProgress,
        purchase,
      } = chapterData;
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
    } catch (error) {
      console.error("[GET_CHAPTER_DATA]", error.message);
      res.status(500).json({ status: "error", message: error.message });
    }
  });
exports.getChapterData = getChapterData;
const updateChapter = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { courseId, chapterId } = req.params;
    const updateChapterDto = req.body;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    if (!userId) {
      res.status(401).json({ status: "error", message: "Unauthorized" });
      return;
    }
    try {
      const updatedChapter = yield chapterService.updateChapter(
        courseId,
        chapterId,
        updateChapterDto,
        userId
      );
      res.status(200).json({
        status: "success",
        data: updatedChapter,
        message: "Chapter updated successfully",
      });
    } catch (error) {
      console.error("[UPDATE_CHAPTER]", error.message);
      res.status(500).json({ status: "error", message: error.message });
    }
  });
exports.updateChapter = updateChapter;
const publishChapterHandler = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { courseId, chapterId } = req.params;
    const user = req.user; // Assuming user info is added via middleware
    try {
      if (!(user === null || user === void 0 ? void 0 : user.id)) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
      const publishedChapter = yield chapterService.publishChapter(
        courseId,
        chapterId,
        user.id
      );
      res.status(200).json({
        chapter: publishedChapter,
        message: "Chapter published successfully",
      });
    } catch (error) {
      console.error("Error publishing chapter:", error);
      res.status(error.status || 400).json({ message: error.message });
    }
  });
exports.publishChapterHandler = publishChapterHandler;
const unpublishChapterHandler = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { courseId, chapterId } = req.params;
    const user = req.user;
    try {
      if (!(user === null || user === void 0 ? void 0 : user.id)) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
      const chapter = yield chapterService.unpublishChapter(
        courseId,
        chapterId,
        user.id
      );
      res.status(200).json({
        chapter,
        message: "Chapter unpublished successfully",
      });
    } catch (error) {
      console.error("[CHAPTER_UNPUBLISH]", error);
      res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  });
exports.unpublishChapterHandler = unpublishChapterHandler;
