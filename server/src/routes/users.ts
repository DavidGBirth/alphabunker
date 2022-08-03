import express from "express";
import { UserController } from "../controllers/user.controller";

const router = express.Router();

router.route("/users")
  //.get(new UserController().find.bind(new UserController()))
  .post(new UserController().create.bind(new UserController()))

export default router