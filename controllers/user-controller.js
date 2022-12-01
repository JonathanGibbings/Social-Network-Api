const { User, Thought } = require("../models");

const userController = {
  getAllUser(req, res) {
    User.find({})
      .populate({
        path: "thoughts",
        selector: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },
  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.json(err));
  },
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: "thoughts",
        selector: "-__v",
      })
      .select("-__v")
      .then((dbUserData) =>
        dbUserData
          ? res.json(dbUserData)
          : res.status(404).json({
              message: "No user found with this id!",
            })
      )
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbUserData) =>
        dbUserData
          ? res.json(dbUserData)
          : res.status(404).json({ message: "No user found with this id!" })
      )
      .catch((err) => res.json(err));
  },
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((dbUserData) =>
        dbUserData
          ? res.json(dbUserData)
          : res.status(404).json({
              message: "No user found with this id!",
            })
      )
      .catch((err) => res.json(err));
  },
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $push: { friends: params.friendId } },
      { new: true }
    )
      .then((dbUserData) =>
        dbUserData
          ? res.json(dbUserData)
          : res.status(404).json({ message: "No user found with this id!" })
      )
      .then(({ thoughts }) =>
        thoughts.forEach((thoughtId) => {
          Thought.findOneAndDelete({ _id: thoughtId });
        })
      )
      .catch((err) => res.json(err));
  },
  deleteFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((dbUserData) =>
        dbUserData
          ? res.json(dbUserData)
          : res.status(404).json({ message: "No user found with this id!" })
      )
      .catch((err) => res.json(err));
  },
};

module.exports = userController;
