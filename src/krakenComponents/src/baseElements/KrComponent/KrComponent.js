import { KrElementClass } from '../KrElementClass/KrElementClass.js'


export class KrComponent extends HTMLElement {
  constructor(elementClass, htmlTemplateID) {
    super();
    this.elementClass = elementClass
      this.htmlTemplateID = htmlTemplateID
    this.KrElement = null
  }


  initObject(){

    this.classList.add(this.elementClass)
    this.KrElement = new KrElementClass(this)

    if(this.htmlTemplateID && this.htmlTemplateID != null){
      this.KrElement.templateID = this.htmlTemplateID
    }

    if(this.htmlTemplate && this.htmlTemplate != null && this.htmlTemplate != ''){
      this.KrElement.template = this.htmlTemplate
      this.KrElement.redraw()
    }



  }

  get htmlTemplate(){
    return 'bob'
  }

  get template(){
    return ''
  }


  get thing(){
    return this.KrElement.thing
  }


  set thing(value){
    this.KrElement.thing = value
  }


  redraw(){
    this.KrElement.redraw()
  }

  connectedCallback() {
    //this.initObject()
    this.initObject()
  }

  disconnectedCallback() {
  }

  adoptedCallback() {
  }

  attributeChangedCallback(name, oldValue, newValue) {
  }

}

customElements.define("kr-base-component", KrComponent);

