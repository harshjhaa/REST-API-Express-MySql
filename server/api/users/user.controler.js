const {
  create,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserByUserEmail,
} = require("./user.service");
const bcrypt = require("bcryptjs");
const { sign } = require("jsonwebtoken");

module.exports = {
  createUser: (req, res) => {
    const body = req.body;
    console.log("body.password: ", body.password);
    const salt = bcrypt.genSaltSync(10);
    body.password = bcrypt.hashSync(body.password, salt);
    create(body, (error, result) => {
      if (error) {
        console.log("Error Occured: ", error);
        return res.status(500).json({
          success: 0,
          message: "Database Error",
          error: error.code + ": " + error.sqlMessage,
        });
      }
      return res.status(200).json({
        success: 1,
        message: "Data Inserted Successfully",
        data: result,
      });
    });
  },
  getUserById: (req, res) => {
    //   const id = req.body.id;
    const body = req.body;
    getUserById(body, (error, result) => {
      if (error) {
        console.log("Error Occured: ", error);
        return res.status(500).json({
          success: 0,
          message: "Database Error",
        });
      }
      if (!result) {
        return res.status(200).json({
          success: 0,
          message: "User Not Present",
        });
      }
      return res.status(200).json({
        success: 1,
        message: "User Found",
        data: result,
      });
    });
  },
  getUsers: (req, res) => {
    getUsers((error, result) => {
      if (error) {
        console.log("Error Occured: ", error);
        return res.status(500).json({
          success: 0,
          message: "Database Connection Error",
        });
      }
      if (!result) {
        return res.status(200).json({
          success: 0,
          message: "No User Present",
        });
      }
      return res.status(200).json({
        success: 1,
        message: "Users Found",
        data: result,
      });
    });
  },
  updateUser: (req, res) => {
    const body = req.body;
    const salt = bcrypt.genSaltSync(10);
    body.password = bcrypt.hashSync(body.password, salt);
    updateUser(body, (error, result) => {
      if (error) {
        console.log("Error Occured: ", error);
        return res.status(500).json({
          success: 0,
          message: "Database Error",
          error: error.code + ": " + error.sqlMessage,
        });
      }
      if (result.changedRows === 0) {
        console.log("result: ", result);
        return res.status(200).json({
          success: 0,
          message: "User Not Present",
        });
      }
      return res.status(200).json({
        success: 1,
        message: "Data Updated Successfully",
      });
    });
  },
  deleteUser: (req, res) => {
    const body = req.body;
    deleteUser(body, (error, result) => {
      if (error) {
        console.log("Error Occured: ", error);
        return res.status(500).json({
          success: 0,
          message: "Database Error",
        });
      }
      if (!result) {
        return res.status(200).json({
          success: 0,
          message: "User Not Present",
        });
      }
      return res.status(200).json({
        success: 1,
        message: "User Deleted Successfully",
      });
    });
  },
  loginControler: (req, res) => {
    const body = req.body;
    getUserByUserEmail(body, (error, result) => {
      if (error) {
        console.log("Error Occured: ", error);
        return res.status(500).json({
          success: 0,
          message: "Database Error",
          error: error.code + ": " + error.sqlMessage,
        });
      }
      if (!result) {
        return res.status(200).json({
          success: 0,
          message: "Invalid Email or Password",
        });
      }
      const match = bcrypt.compareSync(body.password, result.password);
      console.log("match: ", match);
      if (match) {
        result.password = undefined;
        const jsontoken = sign({ result: match }, process.env.JWT_SECRET, {
          expiresIn: "1000hr",
        });
        return res.status(200).json({
          success: 1,
          message: "Login Successful",
          token: jsontoken,
        });
      } else {
        return res.status(200).json({
          success: 0,
          message: "Invalid Email or Password",
        });
      }
    });
  },
};
