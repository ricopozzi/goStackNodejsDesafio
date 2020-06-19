const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");
const app = express();

app.use(express.json());
app.use(cors());


const repositories = [];
const likes = 0


function itExists(request, response, next){
  const { id } = request.params 
  const findRepo = repositories.findIndex(repo => repo.id === id)
  if(repositories[findRepo]){
    return next()
  }else{
  return response.status(400).json({error: "This repository does not exists"})
  }
}
app.use('/repositories/:id',itExists)
app.use('/repositories/:id/like', itExists)

app.get("/repositories", (request, response) => {

  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body

  const respositorie = {
    id: uuid(),
    title,
    url,
    techs,
    likes
  }

  repositories.push(respositorie)

  return response.json(respositorie)
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params
  const {title, url, techs} = request.body

  const findRepo =  repositories.findIndex(repo => repo.id === id)

  const changes = {
    id,
    title,
    url,
    techs,
    likes
  }

  repositories[findRepo] = changes

  return response.json(changes)
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params

  const repositoryIndex = repositories.findIndex(rep => rep.id === id)

  if(repositoryIndex < 0) {
    return response.status(400).json({error: 'repository not found'})
  }

  repositories.splice(repositoryIndex, 1)

  return response.send(204)
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params

  const repIndex = repositories.findIndex(rep => rep.id === id)

  if(repIndex < 0){
    return response.status(400).json({error: "repository does not exist"})
  }

  repositories[repIndex].likes += 1

  const likes = repositories[repIndex].likes

  return response.json({likes})
});


module.exports = app;