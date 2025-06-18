import express, { Request, Response } from "express";
import { User } from "../models/user.models";
import { z } from "zod";

export const usersRoutes = express.Router();

//ZOD validation
const createUserZodSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  age: z.number(),
  password: z.string(),
  role: z.string().optional(),
});

usersRoutes.post("/create-user", async (req: Request, res: Response) => {
  try {
    const body = await createUserZodSchema.parseAsync(req.body);
    console.log(body, "zod Body");

    const user = await User.create(body);

    res.status(201).json({
      success: true,
      message: "User created successfuly",
      user,
    });
  } catch (error: any) {
    console.log(error);

    res.status(400).json({
      success: false,
      message: error.message,
      error,
    });
  }
});
usersRoutes.get("/", async (req: Request, res: Response) => {
  const users = await User.find();

  res.status(201).json({
    success: true,
    message: "All Users retreived successfuly",
    users,
  });
});
usersRoutes.get("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const user = await User.findById(userId);

  res.status(201).json({
    success: true,
    message: "User retrived successfuly",
    user,
  });
});
usersRoutes.delete("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const user = await User.findByIdAndDelete(userId);

  res.status(201).json({
    success: true,
    message: "User Deleted successfuly",
    user,
  });
});
usersRoutes.patch("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const updatedBody = req.body;
  const user = await User.findByIdAndUpdate(userId, updatedBody, { new: true });

  res.status(201).json({
    success: true,
    message: "User updated successfuly",
    user,
  });
});
