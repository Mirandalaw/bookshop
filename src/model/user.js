const db = require("../loader/mysqlConn");
const logger = require("../utils/logger");

module.exports = {
  // 모든 유저 검색
  getAllUser: async () => {
    let connection;
    try {
      const query = ` SELECT * FROM user`;
      connection = await db.getConnection();

      const users = await executeQuery(connection, query);

      return users[0];
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

  // 회원가입
  signUp: async (data) => {
    let connection;
    try {
      const query = `INSERT INTO user (user_uuid,email,role_id,name,password,salt,address_number,phone_number) VALUES ("${data.userUUID}","${data.email}","3","${data.name}","${data.password}","${data.salt}","${data.addressNumber}","${data.phoneNumber}")`;
      connection = await db.getConnection();

      const user = await executeQuery(connection, query);

      return user;
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

  // 로그인 시
  findByEmail: async (email) => {
    let connection;
    try {
      const query = `SELECT user_uuid, password, salt, name, address_number, phone_number  FROM user WHERE email = "${email}"`;

      connection = await db.getConnection();

      const user = await executeQuery(connection, query);

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

  findByUUID: async (uuid) => {
    let connection;
    try {
      const query = `SELECT user_uuid, password, name, address_number, phone_number  FROM user WHERE user_uuid = "${uuid}"`;

      connection = await db.getConnection();

      const user = await executeQuery(connection, query);

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

  insertToken: async (token) => {
    let connection;
    try {
      const query = `INSERT INTO user (refresh_token) VALUES ("${token}")`;

      connection = await db.getConnection();

      const result = await executeQuery(connection, query);

      return result[0][0];
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

  // mypage 정보 조회시
  getInfo: async (uuid) => {
    let connection;
    try {
      const query = `SELECT name, email ,address_number, phone_number, password FROM user WHERE user_uuid = ${uuid}`;

      connection = await db.getConnection();

      const user = await executeQuery(connection, query);

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

  withdrawUser: async (userUUID) => {
    let connection;
    try {
      const query = `UPDATE user SET user_status = 50 WHERE user_uuid = ${userUUID}`;

      connection = await db.getConnection();

      const result = await executeQuery(connection, query);

      console.log("Query Results : ", result);

      return result[0];
    } catch (err) {
      logger.error("WithdrawUser Error : ", err.stack);
      console.error("Error", err.message);
      return err;
    } finally {
      if (connection) {
        await db.releaseConnection(connection);
      }
    }
  },

  // 이름 업데이트
  updateUserInfoName: async (uuid, name) => {
    let connection;
    try {
      const query = `UPDATE user SET name = "${name}" WHERE user_uuid = "${uuid}"`;

      connection = await db.getConnection();

      const result = await executeQuery(connection, query);

      return result[0][0];
    } catch (err) {
      logger.error("UpdateUserInfoName Error : ", err.stack);
      console.error("Error", err.message);
      return err;
    } finally {
      if (connection) {
        await db.releaseConnection(connection);
      }
    }
  },

  // 이메일 업데이트
  updateUserInfoEmail: async (uuid, email) => {
    let connection;
    try {
      const query = `UPDATE user SET email = "${email}" WHERE user_uuid = "${uuid}"`;

      connection = await db.getConnection();

      const result = await executeQuery(connection, query);

      return result[0][0];
    } catch (err) {
      logger.error("UpdateUserInfoName Error : ", err.stack);
      console.error("Error", err.message);
      return err;
    } finally {
      if (connection) {
        await db.releaseConnection(connection);
      }
    }
  },

  // 핸드폰 번호 변경 본인 인증이 필요하지 않을까?
  updateUserInfoPhone: async (uuid, phone) => {
    let connection;
    try {
      const query = `UPDATE user SET phone_number = "${phone}" WHERE user_uuid = "${uuid}"`;

      connection = await db.getConnection();

      const result = await executeQuery(connection, query);

      return result[0][0];
    } catch (err) {
      logger.error("UpdateUserInfoName Error : ", err.stack);
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
