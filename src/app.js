const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/", (request, response) => {
  const { id, url, title, techs, likes } = request.query;

  console.log(id);
  console.log(url);
  console.log(title);
  console.log(techs);
  console.log(likes);
  
  return response.json(repositories);

});

app.get("/repositories", (request, response) => {

});

app.post("/repositories", (request, response) => {
  const { url, title, techs, likes } = request.body;

  const repository = { id: uuid(), url, title, techs, likes };

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { url, title, techs, likes } = request.body;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if(repositoryIndex < 0) {
    return response.status(400).json({ error: "Repository not found!"});
  }

  const repository = {
    id,
    url,
    title,
    techs,
    likes
  };

  repositories[repositoryIndex] = repository;

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { url, title, techs, likes } = request.body;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if(repositoryIndex < 0) {
    return response.status(400).json({ error: "Repository not found!"});
  }

  const repository = {
    id,
    url,
    title,
    techs,
    likes
  };

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  const repository = repositories.find(repository => repository.id === id)

  if(repositoryIndex < 0) {
    return response.status(400).json({ error: "Repository not found!"});
  }

  let likesUpdated = repository.likes + 1;

  repositories[repositoryIndex] = repository.likes ? Object.assign(repository, { likes: likesUpdated }) : Object.assign(repository, { likes: 1 });

  return response.json(repository);
});

app.listen(3333, () => {
  console.log('🚀 Back-end running!')
})

module.exports = app;
