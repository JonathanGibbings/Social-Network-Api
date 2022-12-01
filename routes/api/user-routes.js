const router = require("express").Router();
const {
  getAllUser,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/user-controller");

// /api/users
router
  .route("/")
  .get(getAllUser)
  .post(createUser);

// /api/users/:id
// BONUS when user is deleted remove their associated thoughts
router
  .route("/:id")
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

// /api/users/:userId/friends/:friendId
router
  .route("/:userId/friends/:friendId")
  .post(addFriend)
  .delete(deleteFriend);

module.exports = router;
