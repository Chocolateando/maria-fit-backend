const userService = require("../service/userService");

exports.getById = async (req, res) => {
    try {
      const userId = req.query.id; 
      if (!userId) throw ("Parametros Incorrectos. id = ", userId);
      const user = await userService.listById(userId);
      res.status(200).send({success: true, data: user});
    } catch (error) {
      console.log(error);
      res.status(500).send({success: false, msg: error.message ? error.message : error});
    }
  }