import express from "express";
import { AccountController } from "../controllers/account.controller";

const router = express.Router();

router.route("/accounts")
  .post(new AccountController().create.bind(new AccountController()))

export default router