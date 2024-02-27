import fs from 'fs'
import path from 'path'
import graph from '../src/index.json' assert { type: 'json' }
import { JSDOM } from 'jsdom'

const DOMParser = new JSDOM().window.DOMParser
const arrayify = target => Array.isArray(target) ? target : [target]
const diff = (A, B) => A.filter(x => !B.includes(x))
const origin = 'http://localhost:8888'

const terms = new Map()
graph['@graph'].forEach(node => {
  arrayify(node['skos:prefLabel']).forEach(o => {
    if (o)
      terms.set(o, node['@id'])
  })
  arrayify(node['skos:altLabel']).forEach(o => {
    if (o)
      terms.set(o, node['@id'])
  })
  arrayify(node['skos:hiddenLabel']).forEach(o => {
    if (o)
      terms.set(o, node['@id'])
  })
})
const keywords = Array.from(terms.keys())

const handleError = (err) => {
  console.error(err)
}

const link = ({href, text, rel}) => `<a property=${rel} href=${href}>${text}</a>`

const insertLinks = (node, self) => {
  console.log(`--------`)
  const id = `${origin}/${self.split('.')[0]}`
  console.log(id)
  console.log(`--------`)
  const links = [...node.querySelectorAll('a')].map(link => link.innerHTML)
  diff(keywords, links)
    .filter(k => node.textContent.toLowerCase().includes(k.toLowerCase()))
    .filter(k => terms.get(k) !== id)
    .forEach(k => {
      node.innerHTML = node.innerHTML.replace(k, link({
        text: k,
        href: terms.get(k),
        rel: 'dc:mentions'
      }))
    })
  return node
}

const autolink = async (file) => {
  let src = fs.readFileSync(`./src/${file}`, 'utf8')
  const parser = new DOMParser()

  let html = parser
    .parseFromString(src, "text/html")


  let autoLinkNodes = [...html.querySelectorAll('[data-autolink]')]
  let linkedNodes = autoLinkNodes.map(node => insertLinks(node, file))
  autoLinkNodes.forEach((node, i) => {
    node.innerHTML = linkedNodes[i].innerHTML
  })
  const data = html.querySelector('html').outerHTML
  fs.writeFile(`./src/${file}`, data, (err) => {
    if (err)
      handleError(err)
  })
}

fs.readdir('./src', (err, files) => {
  if (err) {
    handleError(err)
    return
  }
  files
    .filter(file => path.extname(file) == ".html")
    .forEach(file => autolink(file))
})

