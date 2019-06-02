import Project from '../../models/Project'

const Controller = {

  createProject: async (ctx) => {
    const project = ctx.params.project
    await Project.save(project)
    ctx.body = {status: 200, body: 'ok'}
  },

  listProject: async (ctx) => {
    const projects = await Project.find() // TODO: buscar só os projetos que estão finalizados
    ctx.body = {projects}
  },

  getProject: async (ctx) => {
    const _id = ctx.params._id
    await Project.findOne(_id)
    ctx.body = {status: 201, body: 'updated!'}
  },

  updateProject: async (ctx) => {
    const project = ctx.params.project
    await Project.update(project)
    ctx.body = {status: 201, body: 'updated!'}
  },

  deleteProject: async (ctx) => {
    const _id = ctx.params._id
    await Project.remove({_id})
    ctx.body = {status: 201, body: 'removed'}
  }
}

module.exports = Controller
