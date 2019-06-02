const client = require('filestack-js').init(process.env.FILEPICKER_API_KEY)
const token = {}

const FileStack = {
  async uploadFile ({filePath}) {
    const result = client.upload(filePath, {}, {}, token)
    return result
  }
}

module.exports = FileStack
