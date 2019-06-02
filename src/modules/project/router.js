import * as project from './controller'

export const baseUrl = '/projects'

export default [
  {
    method: 'GET',
    route: '/',
    handlers: [
      project.listProject
    ]
  },
  {
    method: 'POST',
    route: '/upload',
    handlers: [
      project.uploadFile
    ]
  },
  {
    method: 'POST',
    route: '/',
    handlers: [
      project.createProject
    ]
  },
  {
    method: 'GET',
    route: '/:id',
    handlers: [
      project.getProject
    ]
  },
  {
    method: 'PUT',
    route: '/:id',
    handlers: [
      project.updateProject
    ]
  },
  {
    method: 'DELETE',
    route: '/:id',
    handlers: [
      project.deleteProject
    ]
  }
]
