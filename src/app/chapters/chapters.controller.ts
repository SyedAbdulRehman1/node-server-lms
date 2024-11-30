import { Request, Response } from "express";
import { ChapterService } from "./chapters.service";
// import { ChapterService } from "./chapter.service";

const chapterService = new ChapterService();

// Fetch a specific chapter
export const getChapter = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { courseId, chapterId } = req.params;

  try {
    const chapter = await chapterService.getChapterWithCompletion(
      courseId,
      chapterId
    );
    res.status(200).json({ status: "success", data: chapter });
  } catch (error: any) {
    console.error("[GET_CHAPTER]", error.message);
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Fetch chapter data dynamically with userId
export const getChapterData = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { courseId, chapterId } = req.query; // Extract query parameters
  const userId = (req as any).user?.id;

  // TypeScript type assertion to ensure values are strings
  if (typeof courseId !== "string" || typeof chapterId !== "string") {
    res
      .status(400)
      .json({ status: "error", message: "Invalid query parameters" });
    return;
  }

  try {
    // Call your service to fetch the data
    const chapterData = await chapterService.getChapterData(
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
  } catch (error: any) {
    console.error("[GET_CHAPTER_DATA]", error.message);
    res.status(500).json({ status: "error", message: error.message });
  }
};
// Update a specific chapter
export const updateChapter = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { courseId, chapterId } = req.params;
  const updateChapterDto = req.body;
  const userId = (req as any).user?.id;

  if (!userId) {
    res.status(401).json({ status: "error", message: "Unauthorized" });
    return;
  }

  try {
    const updatedChapter = await chapterService.updateChapter(
      courseId,
      chapterId,
      updateChapterDto,
      userId
    );
    res.status(200).json({ status: "success", data: updatedChapter });
  } catch (error: any) {
    console.error("[UPDATE_CHAPTER]", error.message);
    res.status(500).json({ status: "error", message: error.message });
  }
};
