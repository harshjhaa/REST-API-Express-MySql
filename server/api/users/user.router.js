const {
  createUser,
  getUserById,
  getUsers,
  updateUser,
  deleteUser,
  loginControler,
} = require("./user.controler");
const router = require("express").Router();

const { checkToken } = require("../../auth/token_validation");

router.post("/", createUser);
router.get("/", checkToken, getUsers);
router.get("/getUserById", checkToken, getUserById);
// router.get("/:id", getUserById);
// router.put("/updateUser", updateUser);
router.patch("/", checkToken, updateUser);
router.delete("/", checkToken, deleteUser);
router.post("/login", loginControler);

module.exports = router;
