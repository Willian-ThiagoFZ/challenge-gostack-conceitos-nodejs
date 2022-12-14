const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid, v4 } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
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

  return response.json(repository);
  
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex >= 0){
    const repositoryExists = repositories[repositoryIndex]

    const repositoryNew = {
      id,
      title,
      url,
      techs,
      likes: repositoryExists.likes
    }

    repositories[repositoryIndex] = repositoryNew

    return response.json(repositoryNew)
  }else{
    return response.status(400).json({ message: "Repository Not Exists." })
  }

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex >= 0){
    repositories.splice(repositoryIndex, 1);
    return response.status(204).send()
  }else {
    return response.status(400).json({ message: "Repository Not Exists." })
  }
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex === -1){
    return response.status(400).json({ error: "Repository Not Exists" })
  }

  const myRespositoryActual = repositories[repositoryIndex];

  myRespositoryActual.likes += 1;
  
  return response.json(myRespositoryActual)

});

module.exports = app;
