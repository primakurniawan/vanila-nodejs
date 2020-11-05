const http = require("http");
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  removeUserById,
} = require("./controllers/users");

const server = http.createServer((req, res) => {
  //Get all user
  if (req.url === "/api/users" && req.method === "GET") {
    getAllUsers(req, res);
  }
  //Get user by id
  else if (req.url.match(/\/api\/users\/([0-9]+)/) && req.method === "GET") {
    const id = parseInt(req.url.split("/")[3]);
    getUserById(req, res, id);
  }
  //Create new user
  else if (req.url === "/api/users" && req.method === "POST") {
    createUser(req, res);
  }
  //Update user by id
  else if (req.url.match(/\/api\/users\/([0-9]+)/) && req.method === "PUT") {
    const id = parseInt(req.url.split("/")[3]);
    updateUserById(req, res, id);
  }
  //If there is no route
  else if (req.url.match(/\/api\/users\/([0-9]+)/) && req.method === "DELETE") {
    const id = parseInt(req.url.split("/")[3]);
    removeUserById(req, res, id);
  } else {
    res.writeHead(400, { "Content-Type": "text/json" });
    res.end(
      JSON.stringify({ message: "error there is no route, bad request" })
    );
  }
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`listen on port ${port}`);
});
