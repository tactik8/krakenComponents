

import { KrThingDb } from '../baseElements/KrThingDb/KrThingDb.js'


export class KrThingDbComponent extends HTMLElement {
  constructor() {
    super();
    this._thingDB = null
  }


  initObject(){

    console.log('Init thing db component')
    this._initElement()
    this._thingDb = new KrThingDb(this.element)
    
  }


  get element(){
    return this
  }

  
  _initElement(){

    let temp = document.createElement('span')
    temp.innerHTML = this.htmlTemplate
    let body = temp.querySelector('.krDbBody')

    while(this.element.firstChild){
      body.appendChild(this.element.firstChild)
    }

    this.element.appendChild(temp)
  }


  
  
  get htmlTemplate(){
    return `

        <div>

          <div class="border row">

            <div class="border col">
  
            DB Element

            </div>

            <div class="border col">

              Save button

            </div>

          </div>


          <div class="border row krDbBody">



          </div>

        </div>

    `
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

customElements.define("kr-thing-db", KrThingDbComponent);

