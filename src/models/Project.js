import mongoose from 'mongoose'

const Attachment = new mongoose.Schema({
  name: { type: String },
  date: { type: Date, default: Date.now },
  url: { type: String }
})

const Step = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  date: { type: Date, default: Date.now },
  attachments: { type: [Attachment] }
})

const Project = new mongoose.Schema({
  type: { type: String }, // subject
  mentor: { type: String },
  author: { type: String },
  simpleDescription: { type: String },
  tags: { type: [String] },
  fullDescription: { type: String },
  body: { type: String },
  steps: { type: [Step] },
  isPending: { type: Boolean, default: false },
  lastInput: { type: String }
})

export default mongoose.model('project', Project)
