// import isArray from 'lodash/isArray'
// import isPlainObject from 'lodash/isPlainObject'
// import flatMap from 'lodash/flatMap'
// import map from 'lodash/map'
// import keys from 'lodash/keys'
// import concat from 'lodash/concat'

export function getPaths (tree, rootNode) {
  const leaves = []
  const walk = function (obj, path) {
    path = path || ''
    for (const n in obj) {
      if (obj.hasOwnProperty(n)) {
        if (typeof obj[n] === 'object' || Array.isArray(obj[n])) {
          walk(obj[n], path + '.' + n)
        } else {
          leaves.push(path + '.' + n)
        }
      }
    }
  }
  walk(tree, rootNode)
  return leaves
}
