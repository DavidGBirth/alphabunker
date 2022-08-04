import express from "express";
import { DepositController } from "../controllers/deposit.controller";
import { WithdrawController } from "../controllers/withdraw.controller";
import { TransferController } from "../controllers/transfer.controller";
import { ExtractController } from "../controllers/extract.controller";

const router = express.Router();

router.route("/deposit")
  .post(new DepositController().handle.bind(new DepositController()))

router.route("/withdraw")
  .post(new WithdrawController().handle.bind(new WithdrawController()))

router.route("/transfer")
  .post(new TransferController().handle.bind(new TransferController()))

router.route("/extract")
  .post(new ExtractController().handle.bind(new ExtractController()))

export default router