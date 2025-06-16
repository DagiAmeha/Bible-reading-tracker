const express = require("express");
const authController = require("../controllers/authController");
const UserController = require("../controllers/userController");
const router = express.Router();

router.post("/auth/signup", authController.signUp);
router.post("/auth/login", authController.login);
router.get("/auth/logout", authController.logout);
router.get("/me", authController.protect, UserController.getMe);
router
  .route("/")
  .get(UserController.getAllUsers)
  .post(UserController.createUser);

router
  .route("/:id")
  .get(UserController.getUserById)
  .patch(UserController.updateUser)
  .delete(UserController.deleteUser);

module.exports = router;
