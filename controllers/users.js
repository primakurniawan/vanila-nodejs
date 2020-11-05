const {
  getAll,
  getSingle,
  createNew,
  update,
  deleteOne,
} = require("../models/Users");
const { getBodyRequest } = require("./../utils");

const getAllUsers = async (req, res) => {
  try {
    const users = await getAll();
    res.writeHead(200, { "Content-Type": "text/json" });
    res.end(JSON.stringify(users));
  } catch (err) {
    console.log(err);
  }
};

const getUserById = async (req, res, id) => {
  try {
    const user = await getSingle(id);
    if (user === undefined) {
      res.writeHead(404, { "Content-Type": "text/json" });
      res.end(
        JSON.stringify({ message: `user with id of ${id} is not found` })
      );
    } else {
      res.writeHead(200, { "Content-Type": "text/json" });
      res.end(JSON.stringify(user));
    }
  } catch (err) {
    console.log(err);
  }
};

const createUser = async (req, res) => {
  try {
    const bodyRequest = await getBodyRequest(req, res);
    const { name, username, email } = JSON.parse(bodyRequest);
    const User = {
      name,
      username,
      email,
    };

    const newData = await createNew(User);
    res.end(JSON.stringify(newData));
  } catch (err) {
    console.log(err);
  }
};

const updateUserById = async (req, res, id) => {
  try {
    const user = await getSingle(id);
    if (user === undefined) {
      res.writeHead(404, { "Content-Type": "text/json" });
      res.end(
        JSON.stringify({ message: `user with id of ${id} is not found` })
      );
    } else {
      const bodyRequest = await getBodyRequest(req, res);
      const { name, username, email } = JSON.parse(bodyRequest);
      const User = {
        name: name || user.name,
        username: username || user.username,
        email: email || user.email,
      };
      const updatedData = await update(id, User);
      res.end(JSON.stringify(updatedData));
    }
  } catch (err) {
    console.log(err);
  }
};

const removeUserById = async (req, res, id) => {
  try {
    const user = await getSingle(id);
    if (user === undefined) {
      res.writeHead(404, { "Content-Type": "text/json" });
      res.end(
        JSON.stringify({ message: `user with id of ${id} is not found` })
      );
    } else {
      const deletedData = await deleteOne(id);
      res.end(JSON.stringify(deletedData));
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  removeUserById,
};
