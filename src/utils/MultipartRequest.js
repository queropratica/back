const {set, isString} = require('lodash')
const asyncBusboy = require('async-busboy')

const MultipartRequest = {

  async parse (ctx) {
    const {files, fields} = await asyncBusboy(ctx.req)
    let requestBody = {files, ...fields}
    return toJSON(requestBody)
  }
}

function toJSON (requestBody) {
  Object.keys(requestBody).map((prop) => {
    let value = requestBody[prop]
    if (isString(value)) {
      set(requestBody, prop, JSON.parse(value))
    }
  })
  return requestBody
}

module.exports = MultipartRequest
