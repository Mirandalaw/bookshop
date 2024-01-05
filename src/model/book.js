const db = require("../loader/mysqlConn");
const logger = require("../utils/logger");

module.exports = {
  getAllBooks: async () => {
    let connection;
    try {
      const query = ` SELECT book_name, auth_name, price, publisher, publish_date, book_introduce  FROM books`;
      connection = await db.getConnection();

      const books = await executeQuery(connection, query);
      console.log("Query Results : ", books);
      return books[0];
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

  findOneBook: async (bookNumber) => {
    let connection;
    try {
      const query = `SELECT book_name, auth_name, price, publisher, publist_date, book_introduce FROM books WHERE book_number = ${bookNumber}`;
      connection = await db.getConnection();

      const book = await executeQuery(connection, query);

      return book;
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

  findOne: async (email) => {
    let connection;
    try {
      const query = `SELECT user_uuid, password, salt, name, address_number, phone_number  FROM user WHERE email = "${email}"`;

      connection = await db.getConnection();

      const user = await executeQuery(connection, query);

      console.log("Query Results : ", user);

      return user[0][0];
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
