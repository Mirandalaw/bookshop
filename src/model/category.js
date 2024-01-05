const db = require("../loader/mysqlConn");
const logger = require("../utils/logger");

module.exports = {
  getAllCategoryZeroDepth: async () => {
    let connection;
    try {
      const query = ` SELECT c.*, cp.depth
        FROM category c
        LEFT JOIN category_paths cp ON c.category_id = cp.ancestor
        WHERE cp.depth = 0 `;
      connection = await db.getConnection();

      const categoryZeroDepth = await executeQuery(connection, query);
      console.log("Query Results : ", categoryZeroDepth);
      return categoryZeroDepth[0];
    } catch (err) {
      logger.error("model Error : ", err.stack);
      console.error("Error", err.message);
      return err;
    } finally {
      if (connection) {
        await db.releaseConnection(connection);
      }
    }
  },

  getSelectedCategoryNDepth: async (number) => {
    let connection;
    try {
      const query = ` SELECT c.* ,cp.depth
      FROM (
          SELECT * FROM category_paths
          WHERE ancestor = ${number}
          )cp
      LEFT JOIN category c ON c.category_id = cp.descendant
      WHERE c.category_id != ${number}; `;
      connection = await db.getConnection();

      const selectedCategoryUnderDepths = await executeQuery(connection, query);
      console.log("Query Results : ", selectedCategoryUnderDepths);
      return selectedCategoryUnderDepths[0];
    } catch (err) {
      logger.error("model Error : ", err.stack);
      console.error("Error", err.message);
      return err;
    } finally {
      if (connection) {
        await db.releaseConnection(connection);
      }
    }
  },

  allBooksByCategory: async (category_id) => {
    let connection;
    try {
      const query = ` SELECT c.* ,cp.depth
      FROM (
          SELECT * FROM category_paths
          WHERE ancestor = ${number}
          )cp
      LEFT JOIN category c ON c.category_id = cp.descendant
      WHERE c.category_id != ${number}; `;
      connection = await db.getConnection();

      const selectedCategoryUnderDepths = await executeQuery(connection, query);
      console.log("Query Results : ", selectedCategoryUnderDepths);
      return selectedCategoryUnderDepths[0];
    } catch (err) {
      logger.error("model Error : ", err.stack);
      console.error("Error", err.message);
      return err;
    } finally {
      if (connection) {
        await db.releaseConnection(connection);
      }
    }
  },
};
async function executeQuery(connection, query) {
  try {
    const results = await connection.query(query);
    return results;
  } catch (error) {
    throw error;
  }
}
