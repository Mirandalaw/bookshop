const categoryModel = require("../model/category");
const logger = require("../utils/logger");

module.exports = {
  findZeroDepth: async () => {
    try {
      const categories = await categoryModel.getAllCategoryZeroDepth();
      return categories;
    } catch (err) {
      console.error(err);
      logger.error("Error : ", err.stack);
      return err;
    }
  },

  findSelectedCategoryUnderDepths: async (number) => {
    try {
      const categories = await categoryModel.getSelectedCategoryNDepth(number);
      return categories;
    } catch (err) {
      console.error(err);
      logger.error("Error : ", err.stack);
      return err;
    }
  },

  findSelectedCategory: async (category_id) => {
    try {
    } catch (err) {
      console.error(err);
      logger.error("FindSelectedCategory Error : ", err.stack);
      return err;
    }
  },
  makeCategoryPath: async () => {
    try {
        function makeCategoryPath(category_id) {
            
        }
    } catch (err) {
      console.error(err);
      logger.error("MakeCategoryPath Error : ", err.stack);
      return err;
    }
  },
};
