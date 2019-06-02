import bluebird from 'bluebird'
import User from '../../models/users'
import Project from '../../models/Project'

const users = [{
  type: 'user',
  name: 'John Doe',
  company: 'GSW',
  jobPosition: 'Developer',
  description: 'The best developer of SJC',
  username: 'john',
  password: '123'
}]

const mentors = [{
  type: 'mentor',
  name: 'Mentor1',
  company: 'GSW',
  jobPosition: 'Master',
  description: 'The best developer of SJC',
  username: 'mentor1',
  password: 'mentor1'
}, {
  type: 'mentor',
  name: 'Mentor2',
  company: 'GSW',
  jobPosition: 'CEO',
  description: 'Especialista em startups',
  username: 'mentor2',
  password: 'mentor2'
}]

const projects = [{
  type: '',
  mentor: '',
  author: '',
  simpleDescription: '',
  tags: ['teste', '123'],
  fullDescription: '',
  body: '',
  steps: [{
    name: '',
    description: '',
    isPending: false,
    isFinished: true,
    date: new Date(),
    attachments: [{
      name: 'artigo_academico1.pdf',
      date: new Date(),
      url: ''
    }, {
      name: 'artigo_pratico2.pdf',
      date: new Date(),
      url: ''
    }]
  }]
}]

export async function seed (ctx) {
  let promises = []
  users.map((user) => { promises.push(User.create(user)) })
  mentors.map((user) => { promises.push(User.create(user)) })
  projects.map((project) => { promises.push(Project.create(project)) })
  await bluebird.all(promises)

  ctx.body = {
    response: 'CRIADO!!'
  }
}

export async function checkHealth (ctx) {
  ctx.body = {
    response: 'TÁ VIVO!!'
  }
}
