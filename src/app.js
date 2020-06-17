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
  const {title, url, techs} = request.body


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
    const {id} = request.params

    const findRepo = repositories.findIndex(repo=> repo.id === id)
    const del = repositories.splice(findRepo, 1)

    return response.json(del)
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params
  const findRepo = repositories.findIndex(repo => repo.id === id)

  const addLike = repositories[findRepo].likes++

  return response.json(addLike)
});


module.exports = app;