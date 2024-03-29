const { Router } = require("express");

const userRouter = Router();

const userController = require("../controller/userController");
const { checkToken } = require("../middleware/auth");

userRouter.get("/mypage", checkToken, userController.findByUUID);
userRouter.put("/mypage", userController.updateName);

userRouter.post("/signup", userController.signUp);

userRouter.post("/login", userController.login);

module.exports = userRouter;
