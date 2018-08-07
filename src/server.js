//const express = require('express') equivaut a la ligne du dessous
import express from 'express'
import fs from 'fs'

const app = express()
var monJson = JSON.parse(fs.readFileSync('movies.json', 'utf8'));

app.get('/ping', function (req, res) {
  //res.status(200).setHeader('content-type', 'application/text').send('pong') equivalent a la ligne du dessous 
  res.send('Pong')
})

app.get('/movies', function (req, res) {
    res.send(monJson)
})

app.listen(5000, function () {
  console.log('Example app listening on port 5000!')
})

