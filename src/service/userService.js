const uuid = require("../utils/uuid");
const userModel = require("../model/user");
const logger = require("../utils/logger");
const redis = require("../utils/redis");
const jwt = require("../utils/jwt");
const crypto = require("../utils/crypto");

module.exports = {
  findAll: async () => {
    try {
      const users = await userModel.getAllUser();
      return users;
    } catch (err) {
      console.error(err);
      logger.error("Error : ", err.stack);
    }
  },

  signUp: async (data) => {
    const userUUID = uuid.createUUID();
    const salt = await crypto.createSalt();
    const hashedPassword = await crypto.createHashedPassword(
      data.password,
      salt,
    );

    if (hashedPassword === undefined) return null;

    data.salt = salt;
    data.password = hashedPassword;
    data.userUUID = userUUID;

    const user = await userModel.signUp(data);

    return user[0];
  },

  findByUUID: async (uuid) => {
    try {
      const userInfo = await userModel.findByUUID(uuid);

      return userInfo;
    } catch (err) {
      logger.error("FindOne Error : ", err.stack);
      return null;
    }
  },

  withdraw: async (userUUID) => {
    try {
      const result = await userModel.withdrawUser(userUUID);

      return result;
    } catch (err) {
      logger.error("Withdraw Error : ", err.stack);
      return null;
    }
  },

  updateName: async (uuid, name) => {
    try {
      const result = await userModel.updateUserInfoName(uuid, name);

      return result;
    } catch (err) {
      logger.error("Withdraw Error : ", err.stack);
      return null;
    }
  },
};
