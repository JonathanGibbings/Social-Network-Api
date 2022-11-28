const { User } = require("../models");

const userController = {
  getAllUser,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
};

module.exports = userController;
