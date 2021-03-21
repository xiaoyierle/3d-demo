export const deepCopy = (obj, cache) => {
  if (cache === void 0) cache = []

  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  var hit = find(cache, function (c) {
    return c.original === obj
  })
  if (hit) {
    return hit.copy
  }

  var copy = Array.isArray(obj) ? [] : {}
  cache.push({
    original: obj,
    copy: copy
  })

  Object.keys(obj).forEach(function (key) {
    copy[key] = deepCopy(obj[key], cache)
  })

  return copy
}