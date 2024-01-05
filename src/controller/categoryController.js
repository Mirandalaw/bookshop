const req = require("express/lib/request");
const categoryService = require("../service/categoryService");
const resHandler = require("../utils/resHandler");

module.exports = {
  findZeroDepth: async (req, res) => {
    try {
      const categories = await categoryService.findZeroDepth();
      console.log(categories);
      resHandler.SuccessResponse(res, categories, 200);
    } catch (err) {
      console.error(err);
      resHandler.FailedResponse(res, err.stack, 500);
    }
  },

  findselectedCategoryUnderDepths: async (req, res) => {
    try {
      const { number } = req.params;
      const categories =
        await categoryService.findSelectedCategoryUnderDepths(number);
      console.log(categories);
      resHandler.SuccessResponse(res, categories, 200);
    } catch (err) {
      console.error(err);
      resHandler.FailedResponse(res, err.stack, 500);
    }
  },
};
