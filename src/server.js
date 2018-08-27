import {app} from './app'

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