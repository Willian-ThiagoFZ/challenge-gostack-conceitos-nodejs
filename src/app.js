const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid, v4 } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  response.json({
    repositories: repositories
  })
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  
  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(repository);

  response.json(repository);
  
});

app.put("/repositories/:id", (request, response) => {
  
});

app.delete("/repositories/:id", (request, response) => {
  
});

app.post("/repositories/:id/like", (request, response) => {
  
});

module.exports = app;
