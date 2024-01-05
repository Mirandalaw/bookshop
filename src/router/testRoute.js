const { Router } = require("express");

const testRouter = Router();

testRouter.get("/", (req, res) => {
  res.send("test");
});

module.exports = testRouter;
