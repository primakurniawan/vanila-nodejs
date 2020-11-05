const { rejects } = require("assert");
const fs = require("fs");
const { resolve } = require("path");

const writeToFile = (where, newData) => {
  fs.writeFile(where, JSON.stringify(newData), () => {
    console.log("data is written");
  });
};

const getBodyRequest = (req, res) => {
  return new Promise((resolve, reject) => {
    try {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        resolve(body);
      });
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = {
  writeToFile,
  getBodyRequest,
};
