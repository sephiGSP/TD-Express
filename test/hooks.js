import fs from 'fs'
import config from 'config'
import { movieList } from './movie-list'

beforeEach('Reset movie file', () => {
    fs.writeFileSync(config.get('jsonFile'), movieList)
})