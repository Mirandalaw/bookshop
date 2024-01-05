const { verifyPassword } = require("../utils/crypto");
const jwt = require("../utils/jwt");
const redis = require("../utils/redis");
const {
  TOKEN_INVALID,
  TOKEN_EXPIRED,
  ACCESSTOKEN_INVALID,
  REFRESHTOKEN_INVALID,
  ACCESSTOKEN_EXPIRED,
  REFRESHTOKEN_EXPIRED,
} = require("../config/jwt/tokenStatusConfig");
const logger = require("../utils/logger");
const userModel = require("../model/user");

module.exports = {
  login: async (data) => {
    try {
      const user = await userModel.findOne(data.email);

      if (user) {
        const { user_uuid, salt, password } = user;

        const verified = await verifyPassword(data.password, salt, password);
        if (verified) {
          const accessToken = jwt.createAccessToken(user_uuid);
          const refreshToken = jwt.createRefreshToken();
          await redis.set(user_uuid, refreshToken);
          await redis.expire(user_uuid, 10 * 60 * 60 * 24);
          return accessToken;
        } else return null;
      }
    } catch (error) {
      console.log(error);
      throw new Error("Login failed");
    }
  },

  verifyToken: async (reqData) => {
    try {
      const accessToken = reqData.headers.authorization.split("Bearer ")[1];
      const accTokenInfo = jwt.verify(accessToken); // => invalid, expired, {payload}

      // accessToken이 invalid된 경우 (accessToken 이 변조된 경우)
      if (accTokenInfo === TOKEN_INVALID)
        return { accessToken: null, result: ACCESSTOKEN_INVALID };
      // accessToken이 expired된 경우 (accessToken이 만료된 경우)
      else if (accTokenInfo === TOKEN_EXPIRED) {
        // refreshToken 의 유효성 검사

        const { user_uuid } = accTokenInfo;
        const refreshToken = await redis.get(user_uuid);
        const refTokenInfo = jwt.refreshVerify(refreshToken, user_uuid);
        if (refTokenInfo === TOKEN_INVALID)
          return { accessToken: null, result: REFRESHTOKEN_INVALID };
        if (refTokenInfo === TOKEN_EXPIRED)
          return { accessToken: null, result: REFRESHTOKEN_EXPIRED };
        else if (refTokenInfo) {
          let new_accessToken = jwt.createAccessToken(user_uuid);
          return { accessToken: new_accessToken, result: ACCESSTOKEN_EXPIRED }; //refreshToken 이 있으니 access 재발급 해서 result 값주고
        }
      } else {
        console.log("AccTokenInfo : ", accTokenInfo.iat);
        return { accessToken: accessToken, result: true };
      }
    } catch (err) {
      console.error(err);
      logger.error("Token Error : ", err.stack);
      return { accessToken: null, result: false };
    }
  },
};
