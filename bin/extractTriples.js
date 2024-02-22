import fs from 'fs'
import path from 'path'
import { JSDOM } from 'jsdom'
import { rdfa2json } from './rdfa2json.js'

let origin = 'http://localhost:8888'
global.DOMParser = new JSDOM().window.DOMParser

const handleError = (err) => {
  console.error(err)
}

const parseFiles =  (files) => {
  const arr = files
    .filter(file => path.extname(file) == ".html")
    .map(file => {
      let html = fs.readFileSync(`./src/${file}`, 'utf8')
      let json = rdfa2json(html, `${origin}/${path.basename(file, '.html')}`)
      return json
    })
  return {
    "@context": `${origin}/context.json`,
    "@graph": arr
  }
}

fs.readdir('./src', (err, files) => {
  if (err) {
    handleError(err)
    return
  }
  let data = parseFiles(files)
  fs.writeFile('./src/index.json', JSON.stringify(data, null, 2), err => {
    if (err)
      handleError(err)
  });
})

