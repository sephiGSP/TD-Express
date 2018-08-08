//const express = require('express') equivaut a la ligne du dessous
import express from 'express'
import fs from 'fs'

const app = express()
var monJson = JSON.parse(fs.readFileSync('movies.json', 'utf8'));

// const headerMiddleware = (req, res, next) =>{
//   res.header('Access-Control-Allow-Origin', 'http://localhost:8081')
//   next()
// }

app.use((req, res, next)=>{
  res.header('Access-Control-Allow-Origin', 'http://localhost:8081')
  next()
})

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