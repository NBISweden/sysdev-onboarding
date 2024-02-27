import getRDF from './getRDF.js'

class ShowPreview extends HTMLElement {
  constructor() {
    super()
  }

  async connectedCallback() {
    const uri = this.querySelector('a').getAttribute("href")
    let jsonld = await getRDF(uri)

    const parser = new DOMParser()

    const template = `
      <details>
        <summary>
          ${this.innerHTML}
        </summary>
        <dfn>
          ${JSON.stringify(jsonld['skos:definition'])}
        </dfn>
      </details>
    `
    let html = parser
      .parseFromString(template, "text/html")
    this.replaceWith(html.body.firstChild)
  }
}

customElements.define("show-preview", ShowPreview)
