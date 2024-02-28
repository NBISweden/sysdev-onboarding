const getNodes = async (uri, selector) => {
  let data = await fetch(uri)
  let txt = await data.text()
  const parser = new DOMParser()
    let html = parser
      .parseFromString(txt, "text/html")
  const nodes = [...html.querySelectorAll(selector)]
  return nodes
}

export default getNodes