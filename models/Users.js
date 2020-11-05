const users = require("../users.json");
const { writeToFile } = require("./../utils");

const getAll = () => {
  return new Promise((resolve, reject) => {
    resolve(users);
  });
};

const getSingle = (id) => {
  return new Promise((resolve, reject) => {
    resolve(users.find((e) => e.id === id));
  });
};

const createNew = (newUser) => {
  return new Promise((resolve, reject) => {
    writeToFile("./users.json", [...users, { id: Date.now(), ...newUser }]);
    resolve(newUser);
  });
};

const update = (id, data) => {
  return new Promise((resolve, reject) => {
    const Index = users.findIndex((e) => e.id === id);
    users[Index] = { id, ...data };
    writeToFile("./users.json", users);
    resolve(users[Index]);
  });
};

const deleteOne = (id) => {
  return new Promise((resolve, reject) => {
    const Index = users.findIndex((e) => e.id === id);
    users.splice(Index, 1);
    writeToFile("./users.json", users);
    resolve(users[Index]);
  });
};

module.exports = { getAll, getSingle, createNew, update, deleteOne };
