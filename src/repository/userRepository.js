const pool = require("../../database");

exports.findByEmailAndPassword = async (email, password) => {
  try {
    const res = await pool.query("SELECT * FROM users u WHERE u.email = $1 and u.password_hash = $2", [email, password]);
    return res.rows[0];
  } catch (err) {
    throw new Error("Error al consultar a la BD: " + err.message);
  }
};

exports.findByEmail = async (email) => {
  try {
    const res = await pool.query("SELECT * FROM users u WHERE u.email = $1", [email]);
    return res.rows[0];
  } catch (err) {
    throw new Error("Error al consultar a la BD: " + err.message);
  }
};

exports.save = async (user) => {
  try {
    const res = await pool.query(
      "INSERT INTO users (name, lastname, age, tall, weight, phone, email, password_hash, subscription_status)" +
        " VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
      [
        user.name,
        user.lastname,
        user.age,
        user.tall,
        user.weight,
        user.phone,
        user.email,
        user.password_hash,
        user.subscription_status,
      ]
    );
    return res.rows[0];
  } catch (err) {
    throw new Error("Error al crear usuario: " + err.message);
  }
};
