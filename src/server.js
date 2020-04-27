const express = require('express');
const usersMockData = require("../data/users");

const server = express();

server.get("/", (request, response) => {
    response.send("Hello!");
});

server.get("/users", (request, response) => {
    response.send(usersMockData);
});

server.listen(process.env.PORT || 8080, () =>
  console.log(`Server listening !`),
);