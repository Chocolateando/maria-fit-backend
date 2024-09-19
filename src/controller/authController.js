const authService = require("../service/authService");

exports.auth = async function (req, res) {
  try {
    let userData = req.body;
    let data = await authService.auth(userData);
    if (data.token) res.status(201).send({ status: true, msg: "success", token: data.token });
    else res.status(401).send({ status: false, msg: data.error });
  } catch (error) {
    res.status(500).send(error);
  }
};