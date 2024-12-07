/**
 * @swagger
 * /categories-and-courses:
 *   get:
 *     summary: Get categories and courses
 *     tags: [Categories]
 *     security:
 *       - BearerAuth: [] # Assuming you're using JWT authentication
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter courses by title
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter courses by category ID
 *     responses:
 *       200:
 *         description: Successfully retrieved categories and courses
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 categories:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                 courses:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       categoryId:
 *                         type: string
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
import { Request, Response } from "express";
import { CategoryService } from "./category.service";

const categoryService = new CategoryService();

export const getCategoriesAndCourses = async (
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
    const categories = await categoryService.getCategories();
    const courses = await categoryService.getCourses({
      userId: userId1,
      title: req.query.title as string,
      categoryId: req.query.categoryId as string,
    });

    res.json({ categories, courses });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// import { Request, Response } from "express";
// import { CategoryService } from "./category.service";

// export class CategoryController {
//   private categoryService: CategoryService;

//   constructor() {
//     this.categoryService = new CategoryService();
//   }

//   async getCategoriesAndCourses(req: Request, res: Response) {
//     console.log(req.headers, "ekekdk");
//     const userId = req.headers["user-id"];

//     if (!userId) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     const title = req.query.title as string;
//     const categoryId = req.query.categoryId as string;

//     try {
//       const categories = await this.categoryService.getCategories();
//       const courses = await this.categoryService.getCourses({
//         userId: userId as string,
//         title,
//         categoryId,
//       });

//       res.json({ categories, courses });
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       res.status(500).json({ message: "Internal Server Error" });
//     }
//   }
// }
