import { ensureUser } from '../../middleware/validators'
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
    route: '/',
    handlers: [
      ensureUser,
      project.createProject
    ]
  },
  {
    method: 'GET',
    route: '/:id',
    handlers: [
      ensureUser,
      project.getProject
    ]
  },
  {
    method: 'PUT',
    route: '/:id',
    handlers: [
      ensureUser,
      project.updateProject
    ]
  },
  {
    method: 'DELETE',
    route: '/:id',
    handlers: [
      ensureUser,
      project.deleteProject
    ]
  }
]
