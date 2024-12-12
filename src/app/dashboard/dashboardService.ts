import { PrismaClient, Course, Category, Chapter } from "@prisma/client";
import { getProgressService } from "./progressService";

const prisma = new PrismaClient();

type CourseWithProgressWithCategory = Course & {
  category: Category;
  chapters: Chapter[];
  progress: number | null;
};

type DashboardCourses = {
  completedCourses: CourseWithProgressWithCategory[];
  coursesInProgress: CourseWithProgressWithCategory[];
};

export const getDashboardCoursesService = async (
  userId: string
): Promise<DashboardCourses> => {
  try {
    const purchasedCourses = await prisma.purchase.findMany({
      where: { userId },
      select: {
        course: {
          include: {
            category: true,
            chapters: {
              where: { isPublished: true },
            },
          },
        },
      },
    });

    const courses = purchasedCourses.map(
      (purchase) => purchase.course
    ) as CourseWithProgressWithCategory[];

    for (let course of courses) {
      const progress = await getProgressService(userId, course.id);
      course["progress"] = progress;
    }

    const completedCourses = courses.filter(
      (course) => course.progress === 100
    );
    const coursesInProgress = courses.filter(
      (course) => (course.progress ?? 0) < 100
    );

    return { completedCourses, coursesInProgress };
  } catch (error) {
    console.error("[GET_DASHBOARD_COURSES_SERVICE]", error);
    return { completedCourses: [], coursesInProgress: [] };
  }
};
