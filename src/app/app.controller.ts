import { Request, Response } from "express";
import { getHello } from "./app.service";

export const getHelloHandler = (req: Request, res: Response): void => {
  const message = getHello();
  res.send("/");
};
