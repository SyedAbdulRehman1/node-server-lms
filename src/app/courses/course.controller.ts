import { Request, Response } from "express";
import { CourseService } from "./course.service";
import { Prisma } from "@prisma/client";
// import { CourseService } from "./course.service";
// import { Request } from 'express';

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

const courseService = new CourseService();

export const createCourseHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const createCourseDto = req.body;
  const user = req.user as any;

  try {
    if (!user?.id || user.userType !== "TEACHER") {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const data = await courseService.createCourse(user.id, createCourseDto);
    const {
      categoryId,
      createdAt,
      description,
      id,
      imageUrl,
      isPublished,
      price,
      title,
      updatedAt,
      userId,
    } = data;
    res.status(201).json({
      categoryId,
      createdAt,
      description,
      id,
      imageUrl,
      isPublished,
      price,
      title,
      updatedAt,
      userId,
      message: "Course created successfully",
    });
  } catch (error: any) {
    console.error("[CREATE COURSE]", error);

    if (error instanceof Prisma.PrismaClientValidationError) {
      res.status(400).json({
        statusCode: 400,
        message: "Prisma validation error",
        error: error.message,
      });
    } else {
      res.status(500).json({
        statusCode: 500,
        message: "Failed to create course",
        error: error.message,
      });
    }
  }
};

export const GetCourses = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId: any = req.user;
  const userId1 = userId?.id;

  if (!userId1) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const courses = await courseService.getCoursesByUser(userId1);
    res.json({ status: "success", courses });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const getCourseDetails = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId: any = req.user; // Get the user ID from the authenticated user
  const userId1 = userId?.id; // Extract userId from the authenticated user
  const courseId = req.params.courseId; // Get the courseId from the route parameters
  console.log(userId, "udfdf");
  console.log(courseId, "dkdk");
  if (!userId1) {
    res.status(401).json({ message: "Unauthorized" }); // Return 401 if the user is not authenticated
    return;
  }

  if (!courseId) {
    res.status(400).json({ message: "Missing courseId" }); // Return 400 if courseId is missing
    return;
  }

  try {
    // Fetch the course details using the service method
    const course = await courseService.getCourseByIdAndUser(courseId, userId1);
    if (!course) {
      res.status(404).json({ message: "Course not found" }); // Return 404 if the course is not found
      return;
    }
    const {
      attachments,
      categoryId,
      chapters,
      createdAt,
      description,
      id,
      imageUrl,
      isPublished,
      price,
      title,
      updatedAt,
      userId,
    } = course;
    res.json({
      status: "success",
      attachments,
      categoryId,
      chapters,
      createdAt,
      description,
      id,
      imageUrl,
      isPublished,
      price,
      title,
      updatedAt,
      userId,
    }); // Return the course details
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({ message: "Internal Server Error" }); // Handle server error
  }
};
export const updateCourse = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userData: any = req.user;
  const userId = userData?.id;

  if (!userId) {
    res.status(401).json({ message: "Unauthorized" }); // If user is not authenticated, return 401
    return;
  }

  const courseId = req.params.courseId; // Get courseId from URL parameter
  const updateData = req.body; // Get update data from the body

  try {
    // Fetch the course by ID and user
    const course = await courseService.getCourseByIdAndUser(courseId, userId);

    if (!course) {
      res
        .status(404)
        .json({ message: "Course not found or unauthorized access." }); // If course not found, return 404
      return;
    }

    // Update the course details
    const updatedCourse = await courseService.updateCourse(
      courseId,
      userId,
      updateData
    );
    res.json({ status: "success", data: updatedCourse }); // Return updated course data
  } catch (error) {
    console.error("Error updating course details:", error);
    res.status(500).json({ message: "Failed to update course details." }); // Return server error if failed
  }
};

export const GetCourseWithProgress = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId: any = req.user;
  const userId1 = userId?.id;
  //   const courseId = userId?.id;
  console.log(userId1, "dfdfd");
  const courseId = req.params.courseId;
  console.log(courseId, "Dfdfdf1111111111111");
  if (!userId1) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    // const courseWithProgress = await courseService.getCourseWithProgress(

    // Pass query parameters to the service method
    const courses = await courseService.getCourseWithProgress(
      courseId,
      userId1
      //   categoryId: req.query.categoryId as string,
    );
    res.json({
      course: courses?.course,
      progressCount: courses?.progressCount,
    });

    // res.json({ courses });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const getUniqueCourse = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId: any = req.user; // Get the user ID from the authenticated user
  const userId1 = userId?.id;
  const courseId = req.params.courseId; // Get the courseId from the route parameters

  if (!userId1) {
    res.status(401).json({ message: "Unauthorized" }); // Return 401 if the user is not authenticated
    return;
  }

  if (!courseId) {
    res.status(400).json({ message: "Missing courseId" }); // Return 400 if the courseId is missing
    return;
  }

  try {
    // Fetch the course details using the service
    const course = await courseService.getCourseById(courseId, userId1);
    res.json({ status: "success", data: course }); // Return the course data
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({ message: "Internal Server Error" }); // Handle server error
  }
};
export const uploadFile = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { courseId } = req.params;
  const user = req.user as { id: string }; // Assuming `req.user` contains the authenticated user
  const userId = user?.id;

  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const file = req.file;

  if (!file) {
    res.status(400).json({ message: "No file uploaded" });
    return;
  }

  const fileUrl = file.path;

  try {
    const updatedCourse = await courseService.updateCourseImage(
      courseId,
      userId,
      fileUrl
    );
    res.status(200).json({ url: fileUrl, updatedCourse });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ message: "Failed to upload file" });
  }
};
export const createChapterHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { courseId } = req.params;
  const { title } = req.body;
  const user = req.user as { id: string };
  const userId = user?.id;

  if (!userId) {
    res.status(401).json({ message: "Unauthorized User ID is required" });
    return;
  }

  try {
    // Verify course ownership
    const isOwner = await courseService.getCourseOwner(courseId, userId);
    if (!isOwner) {
      res.status(403).json({
        message: "You are not authorized to add chapters to this course",
      });
      return;
    }

    // Get the next position for the chapter
    const newPosition = await courseService.getNextPosition(courseId);

    // Create the new chapter
    const chapter = await courseService.createChapter({
      title,
      courseId,
      position: newPosition,
    });

    res.status(201).json(chapter);
  } catch (error) {
    console.error("Error creating chapter:", error);
    res.status(500).json({ message: "Failed to create chapter" });
  }
};
export const getChapterHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { courseId, chapterId } = req.params;
  console.log(courseId, "chadfdf", chapterId);

  try {
    const result = await courseService.getChapterWithCompletion(
      courseId,
      chapterId
    );
    res.status(200).json(result);
  } catch (error: any) {
    console.error("Error fetching chapter:", error);
    res.status(404).json({ message: error.message });
  }
};
export const publishCourseHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id: courseId } = req.params;
  const user = req.user as any; // Assuming user info is added via middleware

  try {
    if (!user?.id) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const publishedCourse = await courseService.publishCourse(
      courseId,
      user.id
    );

    res.status(200).json({
      course: publishedCourse,
      message: "Course published successfully",
    });
  } catch (error: any) {
    console.error("[COURSE_ID_PUBLISH]", error);
    res.status(error.status || 500).json({
      message: error.message || "Internal Server Error",
    });
  }
};

export const unpublishCourseHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id: courseId } = req.params;
  const user = req.user as any;

  try {
    if (!user?.id) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const course = await courseService.unpublishCourse(courseId, user.id);

    res.status(200).json({
      course,
      message: "Course unpublished successfully",
    });
  } catch (error: any) {
    console.error("[COURSE_UNPUBLISH]", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
