
import { KrThing } from 'krakenthing'
import { KrComponent } from '../baseElements/KrComponent/KrComponent.js'
import { KrElementClass } from '../baseElements/KrElementClass/KrElementClass.js'
import { KrakenSchemas, KrSchemaItem } from 'krakenschema'
import { krakenHtml } from 'krakenhtml'



export class KrFormComponent extends HTMLElement {
  constructor() {
    super();

  }


  


  initObject(){


    
    this.classList.add(this.elementClass)
    
    

    let record_type = this.getAttribute('data-record-type')

    console.log(record_type)
    
    let k = KrakenSchemas.get(record_type)

    let jsonSchema = k.jsonSchemaLight

    console.log(jsonSchema)
    
    
    let content = krakenHtml.form.generic('https://www.test.com', 'Thing', null, 'en-US', true)

    
    this.innerHTML = content
    
    
    
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

customElements.define("kr-form", KrFormComponent);

