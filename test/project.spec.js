import app from '../bin/server'
import supertest from 'supertest'
import { expect, should } from 'chai'
import { cleanDb } from './utils'
import ProjectCollection from '../src/models/Project'

should()
const request = supertest.agent(app.listen())
const context = {}

describe('Projects', () => {
  before((done) => {
    cleanDb()
    done()
  })

  describe('POST /project', () => {
    it('should reject when data is incomplete', async (done) => {
      await request
        .post('/project')
        .set('Accept', 'application/json')
        .send({ username: 'supercoolname' })
        .expect(422, done)
    })
  })

  describe('GET /project', () => {
    it.only('should fetch the projects with the default url', async () => {
      const result = await request
        .get('/project')
        .set('Accept', 'application/json')
    })

    it('should not fetch project if the authorization header has invalid scheme', (done) => {
      const { token } = context
      request
        .get('/project')
        .set({
          Accept: 'application/json',
          Authorization: `Unknown ${token}`
        })
        .expect(401, done)
    })

    it('should not fetch project if token is invalid', (done) => {
      request
        .get('/project')
        .set({
          Accept: 'application/json',
          Authorization: 'Bearer 1'
        })
        .expect(401, done)
    })

    it('should fetch all project', (done) => {
      const { token } = context
      request
        .get('/project')
        .set({
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        })
        .expect(200, (err, res) => {
          if (err) { return done(err) }

          res.body.should.have.property('project')

          res.body.project.should.have.length(1)

          done()
        })
    })
  })

  describe('GET /project/:id', () => {
    it('should not fetch user if token is invalid', (done) => {
      request
        .get('/project/1')
        .set({
          Accept: 'application/json',
          Authorization: 'Bearer 1'
        })
        .expect(401, done)
    })

    it('should throw 404 if user doesn\'t exist', (done) => {
      const { token } = context
      request
        .get('/project/1')
        .set({
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        })
        .expect(404, done)
    })

    it('should fetch user', (done) => {
      const {
        user: { _id },
        token
      } = context

      request
        .get(`/project/${_id}`)
        .set({
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        })
        .expect(200, (err, res) => {
          if (err) { return done(err) }

          res.body.should.have.property('user')

          expect(res.body.user.password).to.not.exist

          done()
        })
    })
  })

  describe('PUT /project/:id', () => {
    it('should not update user if token is invalid', (done) => {
      request
        .put('/project/1')
        .set({
          Accept: 'application/json',
          Authorization: 'Bearer 1'
        })
        .expect(401, done)
    })

    it('should throw 404 if user doesn\'t exist', (done) => {
      const { token } = context
      request
        .put('/project/1')
        .set({
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        })
        .expect(404, done)
    })

    it('should update user', (done) => {
      const {
        user: { _id },
        token
      } = context

      request
        .put(`/project/${_id}`)
        .set({
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        })
        .send({ user: { username: 'updatedcoolname' } })
        .expect(200, (err, res) => {
          if (err) { return done(err) }

          res.body.user.should.have.property('username')
          res.body.user.username.should.equal('updatedcoolname')
          expect(res.body.user.password).to.not.exist

          done()
        })
    })
  })

  describe('DELETE /project/:id', () => {
    it('should not delete user if token is invalid', (done) => {
      request
        .delete('/project/1')
        .set({
          Accept: 'application/json',
          Authorization: 'Bearer 1'
        })
        .expect(401, done)
    })

    it('should throw 404 if user doesn\'t exist', (done) => {
      const { token } = context
      request
        .delete('/project/1')
        .set({
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        })
        .expect(404, done)
    })

    it('should delete user', (done) => {
      const {
        user: { _id },
        token
      } = context

      request
        .delete(`/project/${_id}`)
        .set({
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        })
        .expect(200, done)
    })
  })
})
