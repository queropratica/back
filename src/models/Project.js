import mongoose from 'mongoose'
import User from './users'

const Project = new mongoose.Schema({
  type: { type: String }, // subject
  mentor: { type: String },
  author: { type: String },
  simpleDescription: { type: String },
  tags: { type: [String] },
  fullDescription: { type: String },
  body: { type: String },
  step: { type: String },
  isPending: { type: Boolean, default: false },
  lastInput: { type: String }
})

export default mongoose.model('project', Project)
