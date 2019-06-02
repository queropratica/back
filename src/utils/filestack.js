const client = require('filestack-js').init(process.env.FILEPICKER_API_KEY)
const token = {}

const FileStack = {
  async uploadFile ({filePath}) {
    console.log('=============================')
    console.log(JSON.stringify(filePath))
    console.log('=============================')
    const result = client.upload(filePath, {}, {}, token)

    console.log('=============================')
    console.log(JSON.stringify(result))
    console.log('=============================')
    return result
  }
}

module.exports = FileStack
