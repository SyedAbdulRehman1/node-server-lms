import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const updateUserProgress = async (
  userId: string,
  courseId: string,
  chapterId: string,
  isCompleted: boolean
) => {
  const userProgress = await prisma.userProgress.upsert({
    where: {
      userId_chapterId: {
        userId,
        chapterId,
      },
    },
    update: {
      isCompleted,
    },
    create: {
      userId,
      chapterId,
      isCompleted,
    },
  });

  return userProgress;
};
