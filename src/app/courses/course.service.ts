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
}
