// accept raw html string and return a json object
const rdfa2json = (htmlString) => {
  const parser = new DOMParser()
  let html = parser
    .parseFromString(htmlString, "text/html")
  const propertyNodes = [...html.querySelectorAll('[property]')]
  let predicates = propertyNodes.map(node => {
    let obj = {}
    obj[node.getAttribute("property")] = node.getAttribute('href') || node.textContent.trim()
    return obj
  })
  return Object.assign({
    "@context": `${window.location.origin}/context.json`,
    "@type": html.querySelector('[typeof]').getAttribute('typeof'),
    "@id": html.baseURI
  }, ...predicates)
}

export default rdfa2json