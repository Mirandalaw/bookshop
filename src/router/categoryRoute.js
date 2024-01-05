const { Router } = require("express");

const categoryController = require("../controller/categoryController");

const categoryRouter = Router();

categoryRouter.get("/all", categoryController.findZeroDepth);

categoryRouter.get(
  "/:number",
  categoryController.findselectedCategoryUnderDepths
);
// categoryRouter.post("/signup");

// categoryRouter.post("/login");

module.exports = categoryRouter;
