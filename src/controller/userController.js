const authService = require("../service/authService");
const userService = require("../service/userService");
const resHandler = require("../utils/resHandler");

module.exports = {
  userFindAll: async (req, res) => {
    try {
      const user = await userService.findAll();
      console.log(user);
      resHandler.SuccessResponse(res, user, 200);
    } catch (err) {
      console.error(err);
      resHandler.FailedResponse(res, err.stack, 500);
    }
  },

  signUp: async (req, res) => {
    try {
      const user = await userService.signUp(req.body);
      if (user.affectedRows > 0)
        return resHandler.SuccessResponse(res, "01", 201);
      return resHandler.FailedResponse(res, "Failed to sign-up", 400);
    } catch (err) {
      console.error(err);
      resHandler.FailedResponse(res, err.stack, 500);
    }
  },

  login: async (req, res) => {
    try {
      //const user = await userService.findOne(req.body.email);

      const accessToken = await authService.login(req.body);

      if (accessToken) return resHandler.SuccessResponse(res, accessToken, 201);

      return resHandler.FailedResponse(res, "20", 400);
    } catch (err) {
      console.error(err);
      resHandler.FailedResponse(res, err.stack, 500);
    }
  },
  /*
  autoLogin : async (req,res) =>{
    try{
      const status = await authService.autoLogin(req);

      if(status === null) return resHandler.FailedResponse(res,"Unauthorized" , 401);

      if(status === 1) return resHandler.FailedResponse(res,"Invalid token",403 );


    }catch (err) {
      console.error(err);
      resHandler.FailedResponse(res,err.stack,500);
    }
  }
 */

  findByUUID: async (req, res) => {
    try {
      const { uuid } = req.query;

      const user = await userService.findByUUID(uuid);

      if (user) return resHandler.SuccessResponse(res, user, 200);

      return resHandler.FailedResponse(res, "20", 400);
    } catch (err) {
      console.error(err);
      resHandler.FailedResponse(res, err.stack, 500);
    }
  },

  updateName: async (req, res) => {
    try {
      const { name } = req.body;
      const { uuid } = req.query;

      if (uuid === undefined)
        return resHandler.FailedResponse(res, "UUID was not found", 400);

      const result = await userService.updateName(uuid, name);
      console.log(result);
      if (!result) return resHandler.FailedResponse(res, "Failed Update", 400);

      return resHandler.SuccessResponse(res, result, 201);
    } catch (err) {
      console.error(err);
      resHandler.FailedResponse(res, err.stack, 500);
    }
  },
};
