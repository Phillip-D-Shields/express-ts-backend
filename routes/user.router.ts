import express, { Request, Response } from "express";
import User from "../models/user.model";

import { getAllUsers, getOneUser, postOneUser, putOneUserByName, deleteOneUserByName, deleteOneUserByPin } from "../controllers/user.controller";

export const userRouter = express.Router();

userRouter.use(express.json());

// ? GET all
userRouter.get("/", async (req: Request, res: Response) => {
  const response = await getAllUsers();

  if (!response.success) {
    res.status(404).send(response.message);
  } else {
    res.status(200).send(response.users);
  }
})

// ? GET one
userRouter.get("/:pin", async (req: Request, res: Response) => {
  const response = await getOneUser(req.params.pin);

  if (!response.success) {
    res.status(404).send(response.message);
  } else {
    res.status(200).send(response.user);
  }
})

// ? POST one
userRouter.post("/", async (req: Request, res: Response) => {
  const response = await postOneUser(req.body as User);

  if (!response.success) {
    res.status(404).send(response.message);
  } else {
    res.status(200).send(response.message);
  }
});

// ? PUT one by name
userRouter.put("/:name", async (req: Request, res: Response) => {
  const response = await putOneUserByName(req.params.name, req.body as User);

  if (!response.success) {
    res.status(404).send(response.message);
  } else {
    res.status(200).send(response.message);
  }
});

// ? DELETE one by name
userRouter.delete("/name/:name", async (req: Request, res: Response) => {
  const response = await deleteOneUserByName(req.params.name);

  if (!response.success) {
    res.status(404).send(response.message);
  } else {
    res.status(200).send(response.message);
  }
});

// ? DELETE one by pin
userRouter.delete("/pin/:pin", async (req: Request, res: Response) => {
  const response = await deleteOneUserByPin(req.params.pin);

  if (!response.success) {
    res.status(404).send(response.message);
  } else {
    res.status(200).send(response.message);
  }
});

export default userRouter;