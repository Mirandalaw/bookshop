const { Router } = require("express");

const userRouter = require("./userRoute");
const testRouter = require("./testRoute");
const categoryRouter = require("./categoryRoute");

const router = Router();

router.use("/user", userRouter);
router.use("/category", categoryRouter);
router.use("/test", testRouter);

module.exports = router;
