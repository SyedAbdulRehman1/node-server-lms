import {
  PrismaClient,
  Chapter,
  Attachment,
  MuxData,
  UserProgress,
} from "@prisma/client";
import { uploadVideoToMux } from "../../services/muxService";

const prisma = new PrismaClient();

export class ChapterService {
  async getChapterWithCompletion(courseId: string, chapterId: string) {
    const chapter = await prisma.chapter.findUnique({
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
  }

  async getChapterData(userId: string, courseId: string, chapterId: string) {
    try {
      const purchase = await prisma.purchase.findUnique({
        where: { userId_courseId: { userId, courseId } },
      });

      const course = await prisma.course.findUnique({
        where: { id: courseId, isPublished: true },
        select: { price: true },
      });

      const chapter = await prisma.chapter.findUnique({
        where: { id: chapterId, isPublished: true },
      });

      if (!chapter || !course) {
        throw new Error("Chapter or course not found");
      }

      let muxData: MuxData | null = null;
      let attachments: Attachment[] = [];
      let nextChapter: Chapter | null = null;

      if (purchase) {
        attachments = await prisma.attachment.findMany({
          where: { courseId },
        });
      }

      if (chapter.isFree || purchase) {
        muxData = await prisma.muxData.findUnique({ where: { chapterId } });

        nextChapter = await prisma.chapter.findFirst({
          where: {
            courseId,
            isPublished: true,
            position: { gt: chapter.position },
          },
          orderBy: { position: "asc" },
        });
      }

      const userProgress: UserProgress | null =
        await prisma.userProgress.findUnique({
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
    } catch (error: any) {
      console.error("[GET_CHAPTER_DATA_SERVICE]", error.message);
      throw new Error("Internal Server Error");
    }
  }

  async updateChapter(
    courseId: string,
    chapterId: string,
    updateChapterDto: any,
    userId: string
  ): Promise<any> {
    const ownCourse = await prisma.course.findFirst({
      where: { id: courseId, userId },
    });

    if (!ownCourse) {
      throw new Error("Unauthorized");
    }
    const chapter = await prisma.chapter.update({
      where: { id: chapterId, courseId },
      data: updateChapterDto,
    });

    if (updateChapterDto.videoUrl) {
      await uploadVideoToMux(updateChapterDto.videoUrl, chapterId);
    }

    return chapter;
  }
  async deleteChapter(courseId: string, chapterId: string) {
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      throw new Error("Course not found");
    }
    const chapter = await prisma.chapter.findFirst({
      where: {
        id: chapterId,
        courseId,
      },
    });

    if (!chapter) {
      throw new Error("Chapter not found in the specified course");
    }

    const deletedChapter = await prisma.chapter.delete({
      where: { id: chapterId },
    });

    return deletedChapter;
  }

  async publishChapter(courseId: string, chapterId: string, userId: string) {
    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
    });

    if (!course) {
      const error: any = new Error("Unauthorized");
      error.status = 401;
      throw error;
    }

    const chapter = await prisma.chapter.findUnique({
      where: {
        id: chapterId,
        courseId,
      },
    });

    if (
      !chapter ||
      !chapter.title ||
      !chapter.description ||
      !chapter.videoUrl
    ) {
      const error: any = new Error("Missing required fields");
      error.status = 400;
      throw error;
    }

    return await prisma.chapter.update({
      where: {
        id: chapterId,
      },
      data: {
        isPublished: true,
      },
    });
  }
  async unpublishChapter(courseId: string, chapterId: string, userId: string) {
    try {
      // Verify if the user owns the course
      const ownCourse = await prisma.course.findFirst({
        where: {
          id: courseId,
          userId,
        },
      });

      if (!ownCourse) {
        throw "Unauthorized";
      }

      // Unpublish the chapter
      const unpublishedChapter = await prisma.chapter.update({
        where: {
          id: chapterId,
        },
        data: {
          isPublished: false,
        },
      });

      const publishedChapters = await prisma.chapter.findMany({
        where: {
          courseId: courseId,
          isPublished: true,
        },
      });

      if (publishedChapters.length === 0) {
        await prisma.course.update({
          where: {
            id: courseId,
          },
          data: {
            isPublished: false,
          },
        });
      }

      return unpublishedChapter;
    } catch (error: any) {
      console.error("[UNPUBLISH_CHAPTER_ERROR]", error);
      throw new Error("Failed to unpublish chapter");
    }
  }
}
