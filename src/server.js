//const express = require('express') equivaut a la ligne du dessous
import express from 'express'
import fs from 'fs'
import bodyParser from "body-parser"

const app = express()
var monJson = JSON.parse(fs.readFileSync('movies.json', 'utf8'));

app.use((req, res, next)=>{
  res.header('Access-Control-Allow-Origin', 'http://localhost:8081')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

app.use(bodyParser.json());

app.use(express.static('src/assets'));

app.use(function(req, res, next){
  res.setTimeout(2000, function(){
    next()
  })
})

app.get('/ping', function (req, res) {
  //res.status(200).setHeader('content-type', 'application/text').send('pong') equivalent a la ligne du dessous 
  res.send('Pong')
})

app.get('/movies', function (req, res) {
  const filteredMovies = monJson.map(({id, title, poster})=> {
    return {id, title, poster}
  })
  res.send(filteredMovies)
})

app.get('/movies/:id', function (req, res) {
  var id = req.params.id
  const detail = monJson.find(movie => {
    return movie.id == id
  })
  res.send(detail)
})

app.post('/form', function (req,res){
  var title = req.body.title;
  var poster = req.body.poster;
  var desc = req.body.desc;
  var long = Math.max.apply(Math,monJson.map(function(o){return o.id;})) +1
  console.log(long)

  var newMovie = {
    "id": long,
    "title": title,
    "poster": poster,
    "desc": desc
  }

  monJson.push(newMovie)
  fs.writeFile('movies.json', JSON.stringify(monJson));

  console.log("Title = "+title+", poster "+poster+ ", desc " +desc);
  res.end("yes");
})

app.listen(5000, function () {
  console.log('Example app listening on port 5000!')
})

// const filteredMovies = movies.map(movie =>{
//     return{
//         id: id,
//         title: movie.title,
//         poster: movie.poster
//     }
// })

// const filteredMovies = movies.map(({id, title, poster})=>{
//     return {id, title, poster}
// })

// const movie = movies.find(movie => {
//   return movie.title === 'film2'
// })