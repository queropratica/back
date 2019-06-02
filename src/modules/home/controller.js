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
  username: 'john',
  password: '123'
}, {
  type: 'mentor',
  name: 'Mentor2',
  company: 'GSW',
  jobPosition: 'CEO',
  description: 'Especialista em startups',
  username: 'john',
  password: '123'
}]

const projects = [{

}]

export async function seed (ctx) {
  ctx.body = {
    response: 'CRIADO!!'
  }
}
