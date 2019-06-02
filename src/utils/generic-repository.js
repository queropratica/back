const {omit, set} = require('lodash')
const ObjectId = require('mongoose').Types.ObjectId
const RESULTS_PER_PAGE = 10

const Repository = ({collection, QueryBuilder, defaultSort}) => {
  return {
    async save (ata) {
      return collection.create(ata)
    },

    async findOne (query) {
      let entity = await collection.findOne(query).lean()
      return entity
    },

    async findById (id) {
      let _id = new ObjectId(id.toString())
      let entity = await collection.findOne({_id})
      return entity
    },

    async findByIds (ids) {
      let entities = await collection.find({_id: {$in: ids}})
      return entities
    },

    async aggregate (query) {
      return collection.aggregate(query)
    },

    async search (params) {
      let {currentPage = 1, pageSize, sort, sortDirection, filter, noPaginate} = params
      currentPage--
      noPaginate = noPaginate === 'true'
      pageSize = pageSize || (noPaginate ? Number.MAX_SAFE_INTEGER : RESULTS_PER_PAGE)

      let sortJson = createSort(sort, sortDirection)
      let query = QueryBuilder.toSearch(filter)

      let pageSizeInt = parseInt(pageSize)
      let skipResult = noPaginate ? 0 : pageSizeInt * currentPage
      let res = {results: [], total: 0}
      res.results = await collection.find(query).lean().sort(sortJson).skip(skipResult).limit(pageSizeInt)
      res.total = await collection.count(query)
      return res
    },

    async autoCompleteSearch (params) {
      let sortJson = createSort(params.sortBy, 1)
      set(params, '_isAutocompleteSearch', true)
      let query = QueryBuilder.toSearch(params)
      let res = await collection.find(query).lean().sort(sortJson)
      return res
    },

    async update (entity) {
      let _id = new ObjectId(entity._id.toString())
      let $set = flatJson(omit(entity, ['_id']))
      entity = await collection.findOneAndUpdate({_id}, {$set}, {new: true})
      return entity
    },

    async remove (id) {
      let _id = new ObjectId(id.toString())
      await collection.remove({_id})
    },

    async removeAll () {
      await collection.remove({})
    }
  }

  function createSort (field, direction) {
    if (!field || !direction) {
      return defaultSort
    }
    return {[field]: direction}
  }

  function flatJson (obj, opts, parentProp, $set) {
    $set = $set || {}
    opts = opts || {}
    let json = toJSON(obj)

    for (let prop in json) {
      let value = json[prop]
      let newProp = (parentProp ? parentProp + '.' : '') + prop
      const isJsonObject = typeof value === 'object' &&
      value !== null &&
      value !== undefined &&
      !(value instanceof Date) &&
      !(value.constructor && value.constructor.name === 'ObjectID') &&
      prop !== '_id'

      if (Array.isArray(value)) {
        $set[newProp] = value
      } else if (isJsonObject) {
        flatJson(value, opts, newProp, $set)
      } else {
        $set[newProp] = value
      }
    }
    return $set
  }

  function toJSON (obj) {
    return obj && obj.toJSON ? obj.toJSON() : obj
  }
}

module.exports = Repository
