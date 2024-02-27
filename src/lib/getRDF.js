import rdfa2json from './rdfa2json.js'

const getRDF = async (uri) => {
  let data = await fetch(uri)
  let txt = await data.text()
  let json = rdfa2json(txt)
  return json
}

export default getRDF