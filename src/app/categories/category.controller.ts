import { Request, Response } from "express";
import { CategoryService } from "./category.service";

const categoryService = new CategoryService();

export const getCategoriesAndCourses = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId: any = req.user;
  console.log(userId, "djdjdjd");
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
