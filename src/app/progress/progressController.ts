import { Request, Response } from "express";
import { updateUserProgress } from "./progressService";
// import { updateUserProgress } from "../services/progressService";

export const updateProgress = async (req: Request, res: Response) => {
  try {
    const { courseId, chapterId } = req.params;
    const { isCompleted } = req.body;
    const user = req.user as any;
    // const userId = req.user?; // Assuming JWT payload includes `id`

    if (!user.id) {
      throw new Error("Unauthorized");
    }

    const userProgress = await updateUserProgress(
      user.id,
      courseId,
      chapterId,
      isCompleted
    );

    res.status(200).json(userProgress);
  } catch (error) {
    console.error("[CHAPTER_ID_PROGRESS]", error);
    res.status(500).json({ error: "Internal Server Error" + error });
  }
};
