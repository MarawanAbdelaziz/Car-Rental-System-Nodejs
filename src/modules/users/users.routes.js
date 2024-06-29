import express from "express";
import * as userController from "./controllers/users.controller.js";

const usersRouter = express.Router();

usersRouter.post("/signup", userController.register);
usersRouter.get("/login", userController.login);
usersRouter.get("/", userController.getUsers);
usersRouter.get("/user", userController.getUser);
usersRouter.patch("/user", userController.updateUsers);
usersRouter.delete("/user", userController.deleteUsers);

export default usersRouter;
