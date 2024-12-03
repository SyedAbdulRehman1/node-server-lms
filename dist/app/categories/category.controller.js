"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategoriesAndCourses = void 0;
const category_service_1 = require("./category.service");
const categoryService = new category_service_1.CategoryService();
const getCategoriesAndCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user;
    console.log(userId, "djdjdjd");
    const userId1 = userId === null || userId === void 0 ? void 0 : userId.id;
    if (!userId1) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    try {
        const categories = yield categoryService.getCategories();
        const courses = yield categoryService.getCourses({
            userId: userId1,
            title: req.query.title,
            categoryId: req.query.categoryId,
        });
        res.json({ categories, courses });
    }
    catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getCategoriesAndCourses = getCategoriesAndCourses;
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
