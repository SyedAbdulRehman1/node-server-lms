import { Request, Response, NextFunction } from "express";

export const authorizeRole = (requiredRole: string) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    console.log(req, "reqqq");
    const user = req.user as { role: string };
    if (!user || user.role !== requiredRole) {
      res.status(403).json({ message: "Access denied" });
      return;
    }
    next();
  };
};
