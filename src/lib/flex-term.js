import getRDF from './getRDF.js'

class FlexTerm extends HTMLElement {
  constructor() {
    super()
  }

  async connectedCallback() {
    const key = this.getAttribute("show");
    const a = this.querySelector('a')
    const uri = a.getAttribute("href")
    let jsonld = await getRDF(uri)
    a.innerText = jsonld[key]
      ? jsonld[key]
      : a.innerText
  }
}

customElements.define("flex-term", FlexTerm)
