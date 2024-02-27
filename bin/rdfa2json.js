const arrayify = target => Array.isArray(target) ? target : [target]

export const rdfa2json = (htmlString, uri) => {
  const parser = new DOMParser()
  let html = parser
    .parseFromString(htmlString, "text/html")
  const propertyNodes = [...html.querySelectorAll('[property]')]

  let predicates = propertyNodes
    .map(node => {
      let rel = {}
      let p = node.getAttribute("property")
      let o = (node.getAttribute('href') || node.textContent.trim())
      rel[p] = o
      return rel
    })
  const predicateMap = new Map(predicates.map(rel => Object.keys(rel)))
  predicates.forEach(rel => {
    let p = Object.keys(rel)[0]
    let cur = Object.values(rel)[0]
    let acc = predicateMap.get(p)
    let pushO = acc
      ? [...arrayify(acc), cur]
      : cur
    predicateMap.set(p, pushO)
  })
  const rels = Object.fromEntries(predicateMap)

  let type = html.querySelector('[typeof]')
    ? html.querySelector('[typeof]').getAttribute('typeof')
    : 'skos:Resource' // a decent defautl for this app
  return Object.assign({
    "@type": type,
    "@id": uri
  }, rels)
}
