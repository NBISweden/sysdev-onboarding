import getNodes from './getNodes.js'

class SummaryCard extends HTMLElement {
  constructor() {
    super()
  }

  async connectedCallback() {
    const uri = this.querySelector('a').getAttribute("href")
    let nodes = await getNodes(uri, '[property="dc:summary"]')
    const parser = new DOMParser()
    const template = `
      <div class="summary-card">
        ${nodes.map(n => n.outerHTML).concat()}
      </div>
    `
    let html = parser
      .parseFromString(template, "text/html")
    this.replaceWith(html.body.firstChild)
  }
}

customElements.define("summary-card", SummaryCard)
