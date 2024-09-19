import { krakenHtml } from "krakenhtml";
import { KrThing } from "krakenthing";


import { KrGlobalElementDb } from '../KrGlobalElementDB/KrGlobalElementDb.js'

import { elementHelpers as h } from "../elementHelpers.js";
import { preFormatElement } from '../elementTransformation.js'

import { setEvents } from '../../eventsElements/eventsElements.js'



export class KrElementClass {
  constructor(element) {
    this.db = new KrGlobalElementDb()
    this._thing = null;
    this.template = null;
    this.element = element;
  }
  

  // -----------------------------------------------------
  //  Init
  // -----------------------------------------------------

  initObject() {

    // Initialize object 
    this._initElement();
    this.redraw()
  
  }

  _initElement() {
    if (!this._element || this._element == null) {
      return;
    }
    
    if (this.elementType == "krThing") {
      this._initElementThing()
    }

    if (this.elementType == "krProperty") {
      this._initElementProperty()
    }

    if (this.elementType == "krValue") {
      this._initElementValue()
    }
    
  }



  _initElementThing(){
    preFormatElement(this.element)
    this._setID();
    this.properties.map(x => x._initElement())
    this.db.set(this.element, 'KrElementClass', this);

    

    if(this.thingDb && this.thingDb != null){
      if(this.record_type && this.record_id){
        
        this.thingDb.addEventListener(this, this.record_type, this.record_id )
        this.thingDb.get(this.record_type, this.record_id)
      }
    }

    setEvents(this)
  }
  

  _initElementProperty(){
    
    preFormatElement(this.element)
    this._setID();

    this.values.map(x => x._initElement())
    this._getTemplate();
    this.db.set(this.element, 'KrElementClass', this);
    setEvents(this)
    
  }

  _initElementValue(){
    
    preFormatElement(this.element)
    this._setID();
    this.things.map(x => x._initElement())
    this.db.set(this.element, 'KrElementClass', this);
    setEvents(this)
    
  }


  
  _blankRecordIds(element) {
    element.id = ""; //String(crypto.randomUUID())''
    element.setAttribute("kr-db-stored", false);
    for (let e of element.children) {
      this._blankRecordIds(e);
    }
  }

  _getTemplate() {
    if (this.body.innerHTML != "") {
      this._blankRecordIds(this.body);
      this.template = this.body.innerHTML;
      this.body.innerHTML = ''
    }
  }

  _setID() {
    if (
      !this._element.id ||
      this._element.id == null ||
      this._element.id == ""
    ) {
      this._element.id = String(crypto.randomUUID());
    }
  }

 

  // -----------------------------------------------------
  //  Element attribute
  // -----------------------------------------------------

  convertToKrElement(element){
    if(Array.isArray(element)){
      let results = []
      for(let e of element){
        let obj = this.convertToKrElement(e)
        if(obj && obj != null){
          results.push(obj)
        }
      }
      return results
    }

    if(!element || element == null){
      return null
    }
    // Get from db
    let obj = this.db.get(element, 'KrElementClass')

    // Create if KrElement doesn't exist
    if(!obj || obj == null){
      obj = new KrElementClass(element)
      this.db.set(element, 'KrElementClass', obj)
    }
    return obj
    
  }
  
  // Parent
  get parentThing() {
    return this.convertToKrElement(h.getParent(this.element, "krThing"));
  }
  get parentProperty() {
    return this.convertToKrElement(h.getParent(this.element, "krProperty"));
  }
  get parentValue() {
    return this.convertToKrElement(h.getParent(this.element, "krValue"));
  }

  // Children
  get things() {
    return this.convertToKrElement(h.getChildrenAll(this.element, "krThing", "krProperty"));
  }
  get properties() {
    return this.convertToKrElement(h.getChildrenAll(this.element, "krProperty", "krValue"));
  }
  get values() {
    return this.convertToKrElement(h.getChildrenAll(this.element, "krValue", "krThing"));
  }

  // Databases
  get thingDb(){
    return this.db.get(h.getParent(this.element, "kr-db"), 'KrThingDb')
  }

  // Sections
  get header() {
    let section = "Header";
    let elementType = h.getType(this.element);
    let nextElementType = h.getNextType(this.element);
    return h.getChildren(this.element, elementType + section, nextElementType);
  }

  get body() {
    let section = "Body";
    let elementType = h.getType(this.element);
    let nextElementType = h.getNextType(this.element);
    return h.getChildren(this.element, elementType + section, nextElementType);
  }

  get footer() {
    let section = "Footer";
    let elementType = h.getType(this.element);
    let nextElementType = h.getNextType(this.element);
    return h.getChildren(this.element, elementType + section, nextElementType);
  }

  get action() {
    let section = "Action";
    let elementType = h.getType(this.element);
    let nextElementType = h.getNextType(this.element);
    return h.getChildren(this.element, elementType + section, nextElementType);
  }

  // -----------------------------------------------------
  //  Attributes
  // -----------------------------------------------------

  get element() {
    return this._element;
  }

  set element(value) {
    this._element = value;
    this.initObject();
  }

  get elementType() {
    return h.getType(this.element);
  }

  get record_type() {
    if (this._thing) {
      return this._thing.record_type;
    } else {
      return this.element.getAttribute("data-record-type");
    }
  }

  set record_type(value) {
    if (this._thing) {
      this._thing.record_type = value;
    } else {
      this.element.setAttribute("data-record-type", value);
    }
  }

  get record_id() {
    if (this._thing) {
      return this._thing.record_id;
    } else {
      return this.element.getAttribute("data-record-id");
    }
  }

  set record_id(value) {
    if (this._thing) {
      this._thing.record_id = value;
    } else {
      this.element.setAttribute("data-record-id", value);
    }
  }

  get propertyID() {
    return this.element.getAttribute("data-propertyID");
  }

  set propertyID(value) {
    return this.element.setAttribute("data-propertyID", value);
  }

  get valueID() {
    return this.element.getAttribute("data-valueID");
  }

  set valueID(value) {
    return this.element.setAttribute("data-valueID", value);
  }

  
  get thing() {    

    let thing = this.parentThing?._thing;
    return thing;
    
  }

  set thing(value) {

    // Save to db if exists
    let thingDb = this.thingDb
    if(thingDb && thingDb != null){
      thingDb.set(value)
      thingDb.addEventListener(this, value.record_type, value.record_id )
    }
    

    //
    this._thing = value;
    if(this.element && this.element != null){
      this.element.setAttribute("data-record-type", value.record_type); 
      this.element.setAttribute("data-record-id", value.record_id);
    }
    this.initObject();

    let temp = this
    this._thing.addEventListener('all', event =>{
      console.log('Thing event')
      temp.redraw()
    })
  }

  get value() {
    let thingObject = this.parentThing;
    let record_type = thingObject.record_type;
    let propertyObject = this.parentProperty;
    let property = this.thing.getProperty(propertyObject.propertyID);
    let pvs = property.propertyValues;

    let value = null;
    for (let pv of pvs) {
      if (pv.record_id == this.valueID) {
        value = pv.value;
      }
    }

    if (value.record_type) {
      value = value.record;
    }
  }

  get templateID(){
    return this.element.getAttribute('data-templateID')
  }

  set templateID(value){
     this.element.setAttribute('data-templateID', value)
  }

  get options() {
    let record = {
      hostname: "https://test.com",
      path: "/",
      params: {},
      record_type: "Thing",
      record_id: "Thing1",
    };
    return record;
  }

  // -----------------------------------------------------
  //  Redraw
  // -----------------------------------------------------

  redraw() {
    
    if (!this.thing || this.thing == null) {
      return;
    }
    if(!this.element || this.element == null){ return }

    switch (this.elementType) {
      case "krThing":
        return this._redrawThing();
      case "krProperty":
        return this._redrawProperty();
      case "krValue":
        return this._redrawValue();
    }
  }

  _redrawThing() {

    let record = this.thing.record
    if(record?.['@type']){
      record._heading1=record?.name
      record._heading2=record?.['@id']
    }


    // Create properties from template if not already there
    if(!this.properties || this.properties.length == 0){

      if (this.templateID && this.templateID != null) {
         h.redrawTemplateId(
          this.body,
          this.templateID,
          record,
          this.options,
        );
      } else if (this.template && this.template != null) {

         h.redrawTemplate(
          this.body,
          this.template,
          record,
          this.options,
        );
      }      
    }

    // Refresh properties
    if (this.properties.length > 0) {
      for (let p of this.properties) {
        if (p) {
          p.redraw();
        }
      }
    } 
    
  }

  _redrawProperty() {


    let property = this.thing.getProperty(this.propertyID);
    let pvs = property.propertyValues;

    // Remove values no longer present
    let pvIDs = pvs.map((x) => x.record_id);
    h.removeChildren(this.element, "krValue", "krThing", "valueID", pvIDs);

    let item;
    for (let pv of pvs) {
      // Get existing value element
      let valueObject = this.convertToKrElement(
        h.getChildren(
          this.element,
          "krValue",
          "krThing",
          "valueID",
          pv.record_id,
        )
      );

      
      // Create if not already present
      if (!valueObject || valueObject == null) {
        let valueElement = document.createElement("span");
        valueElement.classList.add("krValue");
        valueElement.setAttribute("data-valueID", pv.record_id);

        valueObject = new KrElementClass(valueElement);
        this.db.set(valueObject.element, 'KrElementClass', valueObject);
      }

      // Add to document
      if (item) {
        item.after(valueObject.element);
      } else {
        this.body.prepend(valueObject.element);
      }

      valueObject.redraw();
    }
  }

  _redrawValue() {
   
    if (!this.body || this.body == null) {

      // Add body if missing one
      let temp = document.createElement("span");
      while (this.element.firstElementChild) {
        temp.appendChild(this.element.firstElementChild);
      }
      this.element.innerHTML = this.getValueTemplate();
      while (temp.firstElementChild) {
        this.body.appendChild(temp.firstElementChild);
      }
    }

    let thingObject = this.parentThing;
    let record_type = thingObject.record_type;
    let propertyObject = this.parentProperty;
    let property = this.thing.getProperty(propertyObject.propertyID);
    let pvs = property.propertyValues;

    let value = null;
    for (let pv of pvs) {
      if (pv.record_id == this.valueID) {
        value = pv.value;
      }
    }

    if (propertyObject.templateID) {

      let record = value.record || value
      if(record['@type']){
        record._heading1=record?.name
        record._heading2=record?.url
      }
      h.redrawTemplateId(
        this.body,
        propertyObject.templateID,
        record,
        this.options,
      );
    } else if (propertyObject.template) {
      
      h.redrawTemplate(this.body, propertyObject.template);
    } else {
      h.redrawValue(
        this.body,
        record_type,
        propertyObject.propertyID,
        value.record || value,
        this.options,
      );
    }

    // COnvert child things to objects
    if (this.things && this.things.length > 0) {
      for (let t of this.things) {
        t.thing = value;
        t.redraw()
      }
    }

    return;
  }

  // -----------------------------------------------------
  //  Templates
  // -----------------------------------------------------

  getValueTemplate() {
    let template = `
    <span>Value</span>
    <span class="krValueHeader"></span>
    <span class="krValueBody"></span> 
    <span class="krValueFooter"></span>
    <span class="krValueAction"></span> 
    
    `;
    return template;
  }

  
}
