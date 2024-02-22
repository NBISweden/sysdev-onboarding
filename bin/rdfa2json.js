export const rdfa2json = (htmlString, uri) => {
  const parser = new DOMParser()
  let html = parser
    .parseFromString(htmlString, "text/html")
  const propertyNodes = [...html.querySelectorAll('[property]')]
  let predicates = propertyNodes.map(node => {
    let obj = {}
    obj[node.getAttribute("property")] = node.getAttribute('href') || node.textContent.trim()
    return obj
  })
  let type = html.querySelector('[typeof]')
    ? html.querySelector('[typeof]').getAttribute('typeof')
    : 'skos:Resource' // a decent defautl for this app
  return Object.assign({
    "@type": type,
    "@id": uri
  }, ...predicates)
}
