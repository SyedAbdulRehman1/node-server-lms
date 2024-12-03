import { PrismaClient } from "@prisma/client";
// import { HttpException, HttpStatus } from '@nestjs/common'; // If using NestJS, otherwise replace with appropriate error handling

export class CourseService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }
  async getCoursesByUser(userId: string) {
    try {
      const courses = await this.prisma.course.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
      });
      return courses; // Return the list of courses
    } catch (error) {
      console.error("Error in getCoursesByUser:", error);
      throw "Internal Server Error";
    }
  }
  async getCourseByIdAndUser(courseId: string, userId: string) {
    try {
      const course = await this.prisma.course.findUnique({
        where: {
          id: courseId,
          userId: userId,
        },
        include: {
          chapters: {
            orderBy: { position: "asc" },
          },
          attachments: {
            orderBy: { createdAt: "desc" }, // Order attachments by creation date
          },
        },
      });

      return course;
    } catch (error) {
      console.error("Error in getCourseByIdAndUser:", error);
      throw new Error("Error fetching course details");
    }
  }
  // Method to get course details along with progress
  async getCourseWithProgress(courseId: string, userId: string) {
    try {
      // Fetch course details with related chapters and user progress
      const course = await this.prisma.course.findUnique({
        where: { id: courseId },
        include: {
          chapters: {
            where: { isPublished: true },
            include: {
              userProgress: { where: { userId } }, // Fetch progress for the given user
            },
            orderBy: { position: "asc" }, // Order chapters by their position
          },
        },
      });

      if (!course) {
        return null; // If no course found, return null
      }

      // Calculate progress for the course
      const progressCount = await this.getProgress(userId, courseId);

      // Return course details along with progress count
      //   return { course, progressCount };
      return {
        course,
        progressCount,
      };
    } catch (error) {
      console.error("[GET_COURSE_WITH_PROGRESS]", error);
      //   throw ("Error fetching course details");
      throw { status: 500, message: "Error fetching courses" };
    }
  }

  // Method to calculate user's progress in a specific course
  async getProgress(userId: string, courseId: string): Promise<number> {
    try {
      // Fetch published chapters for the course
      const publishedChapters = await this.prisma.chapter.findMany({
        where: {
          courseId,
          isPublished: true,
        },
        select: {
          id: true,
        },
      });

      const publishedChapterIds = publishedChapters.map(
        (chapter) => chapter.id
      );

      // Count the number of completed chapters for the user
      const completedChapters = await this.prisma.userProgress.count({
        where: {
          userId,
          chapterId: {
            in: publishedChapterIds,
          },
          isCompleted: true,
        },
      });

      // Calculate the progress percentage
      return (completedChapters / publishedChapterIds.length) * 100;
    } catch (error) {
      console.error("[GET_PROGRESS]", error);
      return 0; // If there's an error, return 0 progress
    }
  }
  async getCourseById(courseId: string, userId: string) {
    try {
      const course = await this.prisma.course.findUnique({
        where: {
          id: courseId,
          userId: userId,
        },
        include: {
          chapters: {
            where: { isPublished: true },
            orderBy: { position: "asc" },
          },
        },
      });

      if (!course) {
        throw new Error("Course not found");
      }

      return course;
    } catch (error) {
      console.error("Error fetching course details:", error);
      throw new Error("Error fetching course details");
    }
  }
  async updateCourse(courseId: string, userId: string, updateData: any) {
    try {
      const updatedCourse = await this.prisma.course.update({
        where: {
          id: courseId,
          userId: userId,
        },
        data: updateData,
      });

      return updatedCourse;
    } catch (error) {
      console.error("Error in updateCourse:", error);
      throw new Error("Failed to update course details");
    }
  }

  async updateCourseImage(courseId: string, userId: string, imageUrl: string) {
    try {
      return await this.prisma.course.update({
        where: {
          id: courseId,
          userId: userId,
        },
        data: {
          imageUrl: imageUrl,
        },
      });
    } catch (error) {
      console.error("Error updating course image:", error);
      throw new Error("Failed to update course image");
    }
  }
  async getCourseOwner(courseId: string, userId: string): Promise<boolean> {
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
      select: { userId: true },
    });
    return course?.userId === userId;
  }

  /**
   * Gets the next position for a new chapter in the course.
   */
  async getNextPosition(courseId: string): Promise<number> {
    const lastChapter = await this.prisma.chapter.findFirst({
      where: { courseId },
      orderBy: { position: "desc" },
    });
    return lastChapter ? lastChapter.position + 1 : 1;
  }

  /**
   * Creates a new chapter in the course.
   */
  async createChapter(data: {
    title: string;
    courseId: string;
    position: number;
  }) {
    return this.prisma.chapter.create({
      data,
    });
  }

  async getChapterWithCompletion(
    courseId: string,
    chapterId: string
  ): Promise<any> {
    const chapter = await this.prisma.chapter.findUnique({
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

    const isComplete = completedFields === totalFields;
    const completionText = `(${completedFields}/${totalFields})`;

    return {
      chapter,
      isComplete,
      completionText,
    };
  }

  async publishCourse(courseId: string, userId: string) {
    // Fetch the course with related chapters
    const course = await this.prisma.course.findFirst({
      where: {
        id: courseId,
        userId,
      },
      include: {
        chapters: {
          include: {
            muxData: true,
          },
        },
      },
    });

    if (!course) {
      const error: any = new Error("Course not found");
      error.status = 404;
      throw error;
    }

    // Check if the course has a published chapter
    const hasPublishedChapter = course.chapters.some(
      (chapter) => chapter.isPublished
    );

    // Validate required fields
    if (
      !course.title ||
      !course.description ||
      !course.imageUrl ||
      !hasPublishedChapter
    ) {
      const error: any = new Error("Missing required fields");
      error.status = 400;
      throw error;
    }

    // Update the course's publication status
    const publishedCourse = await this.prisma.course.update({
      where: {
        id: courseId,
      },
      data: {
        isPublished: true,
      },
    });

    return publishedCourse;
  }

  async createCourse(userId: string, createCourseDto: { title: string }) {
    try {
      const { title } = createCourseDto;

      const course = await this.prisma.course.create({
        data: {
          userId,
          title,
        },
      });

      return course;
    } catch (error: any) {
      console.error("[CREATE COURSE - PRISMA ERROR]", error);
      throw new Error("Failed to create course");
    }
  }
  async unpublishCourse(courseId: string, userId: string) {
    try {
      // Verify if the user owns the course
      const course = await this.prisma.course.findFirst({
        where: {
          id: courseId,
          userId,
        },
      });

      if (!course) {
        throw "Course not found";
      }

      const unpublishedCourse = await this.prisma.course.update({
        where: {
          id: courseId,
        },
        data: {
          isPublished: false,
        },
      });

      return unpublishedCourse;
    } catch (error: any) {
      console.error("[UNPUBLISH_COURSE_ERROR]", error);
      throw new Error("Failed to unpublish course");
    }
  }
}
