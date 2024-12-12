import { Request, Response } from "express";
import { getDashboardCoursesService } from "./dashboardService";

export const getDashboardCourses = async (req: Request, res: Response) => {
  try {
    // const userId = req.user?.id; // Assuming JWT-based auth
    const user: any = req.user;
    const userId = user?.id;
    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
    }

    const dashboardCourses = await getDashboardCoursesService(userId);

    res.status(200).json(dashboardCourses);
  } catch (error) {
    console.error("[GET_DASHBOARD_COURSES]", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
