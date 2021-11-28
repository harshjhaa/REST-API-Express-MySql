const pool = require("../../config/database");

module.exports = {
  create: (data, callback) => {
    pool.query(
      `insert into registration(name, email, password, mobile)
            values(?,?,?,?)`,
      [data.name, data.email, data.password, data.mobile],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, result);
      }
    );
  },
  getUsers: (callback) => {
    pool.query(
      `select id, name, email, mobile from registration`,
      [],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, result);
      }
    );
  },
  getUserById: (data, callback) => {
    pool.query(
      `select id, name, email, mobile from registration where id = ?`,
      [data.id],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, result[0]);
      }
    );
  },
  updateUser: (data, callback) => {
    pool.query(
      `update registration set name=?, email=?, password=?, mobile=? where id = ?`,
      [data.name, data.email, data.password, data.mobile, data.id],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        }
        console.log("ResulT: ", result);
        return callback(null, result);
      }
    );
  },
  deleteUser: (data, callback) => {
    pool.query(
      `DELETE FROM registration WHERE id = ?`,
      // `select * registration WHERE id = ?`,
      [data.id],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, result);
      }
    );
  },
  getUserByUserEmail: (data, callback) => {
    pool.query(
      `select * from registration where email = ?`,
      // `select id, name, email, mobile from registration where email = ?`,
      [data.email],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, result[0]);
      }
    );
  },
};
