import {
  PrismaClient,
  Chapter,
  Attachment,
  MuxData,
  UserProgress,
} from "@prisma/client";

const prisma = new PrismaClient();

export class ChapterService {
  // Get a chapter with completion status
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

  // Get dynamic chapter data
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

  // Update a chapter
  async updateChapter(
    courseId: string,
    chapterId: string,
    updateChapterDto: Partial<Chapter>,
    userId: string
  ) {
    const ownCourse = await prisma.course.findUnique({
      where: { id: courseId, userId },
    });

    if (!ownCourse) {
      throw new Error("Unauthorized");
    }

    const updatedChapter = await prisma.chapter.update({
      where: { id: chapterId, courseId },
      data: updateChapterDto,
    });

    if (updateChapterDto.videoUrl) {
      // Logic for handling Mux video upload if needed
      console.log(`Uploading video for chapter: ${chapterId}`);
    }

    return updatedChapter;
  }
}
