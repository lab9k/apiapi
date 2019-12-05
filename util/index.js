export default {
  buildJSONTree (json) {
    let counter = 0
    const builder = jsonObject =>
      Object.entries(jsonObject).map(([key, value]) => {
        let label = `${key}`
        counter += 1
        const id = counter
        let children = []
        if (Array.isArray(value)) {
          const child = value[0]
          if (typeof child === 'object' && child !== null) {
            children = builder(child)
          } else {
            children = value.map((v) => {
              counter += 1
              return { label: v, id: counter }
            })
          }
        } else if (typeof value === 'object' && value !== null) {
          children = builder(value)
        } else {
          label += `: ${value}`
          children = undefined
        }
        const obj = { label, children, id }
        Object.keys(obj).forEach(k => (obj[k] === undefined ? delete obj[k] : ''))
        return obj
      })
    return builder(json)
  }
}
