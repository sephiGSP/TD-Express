import supertest from 'supertest'
import app from '../src/app'
import should from 'should'

describe('GET/movies', () => {
    it('should send a list of movies', done => {
        supertest(app)
            .get('/movies')
            .expect(200)
            .expect(res => {
                should.exist(res.body)
                res.body.should.be.a.Array
                res.body.length.should.be.above(0)
                res.body[0].should.have.only.keys('id', 'title', 'poster')
            })
            .end(done)
    })
})

describe('GET/movies/:id', () => {
    it('should send a movie', done => {
        supertest(app)
            .get('/movies/1')
            .expect(200)
            .expect(({body}) => {
                should.exist(body)
                body.should.be.a.Object
                body.should.have.only.keys('id', 'title', 'poster', 'desc')
            })
            .end(done)
    })
    it('should send a 404 error', done => {
        supertest(app)
        .get('/movies/100')
        .expect(404)
        .expect(({text}) => {
            should.exist(text)
            text.should.not.be.empty
        })
        .end(done)
    })
})

describe('POST/form', () => {
    it('should add a movie', done => {
        supertest(app)
        .post('/form')
        .send({title: 'un film random', poster: 'une url random', desc: 'un synopsis random'})
        .expect(200)
        .expect(res => {
            should.exist(res.body)
            res.body.should.be.a.Object
        })
        .end(done)
    })
    it('should send a 400 status', done => {
        supertest(app)
        .post('/form')
        .send({title: '', poster: '', desc: ''})
        .expect(400)
        .expect(res => {
            should.exist(res.body)
            res.body.should.be.a.Array
        })
        .end(done)
    })
})