import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProgressService = async (
  userId: string,
  courseId: string
): Promise<number> => {
  try {
    const publishedChapters = await prisma.chapter.findMany({
      where: {
        courseId,
        isPublished: true,
      },
      select: { id: true },
    });

    const publishedChapterIds = publishedChapters.map((chapter) => chapter.id);

    const validCompletedChapters = await prisma.userProgress.count({
      where: {
        userId,
        chapterId: { in: publishedChapterIds },
        isCompleted: true,
      },
    });

    const progressPercentage =
      (validCompletedChapters / publishedChapterIds.length) * 100;

    return progressPercentage || 0;
  } catch (error) {
    console.error("[GET_PROGRESS_SERVICE]", error);
    return 0;
  }
};
