import {krakenHtml as $5OpyM$krakenHtml} from "krakenhtml";
import {KrCache as $5OpyM$KrCache, KrThing as $5OpyM$KrThing} from "krakenthing";
import {KrakenSchemas as $5OpyM$KrakenSchemas} from "krakenschema";



const $eed02460515008be$var$GLOBAL_DB = {};
class $eed02460515008be$export$261128914cda1d44 {
    /**
     * Database to store elements and associated information
     *
     * Store elements
     * - setElement(element)
     * - getElement(id)
     * - getElements()
     *
     * Store associated information / objects
     * - setObject(element / elementId, category, object)
     * - getObject(element / elementId, category)
     * - getObjects(category)
     */ constructor(){
        this._db = $eed02460515008be$var$GLOBAL_DB;
    }
    getElements() {
        let elements = [];
        for (let elementId of Object.keys(this._db)){
            let element = this.getElement(elementId);
            if (element && element != null) elements.push(element);
        }
        return elements;
    }
    getElement(elementId) {
        return this._getObjectById(elementId, "_element");
    }
    getObject(element, category) {
        return this.get(element, category);
    }
    get(value1, category) {
        if (!value1 || value1 == null || value1) {
            if (Array.isArray(value1)) {
                let results = [];
                for (let v of value1)results.push(this.get(v, category));
                return results;
            }
        }
        if (value1 instanceof Element || value1 instanceof Document) return this._getObjectByElement(value1, category);
        else return this._getObjectById(value1, category);
    }
    getObjects(category) {
        let elements = [];
        for (let elementId of Object.keys(this._db)){
            let element = this.get(elementId, category);
            if (element && element != null) elements.push(element);
        }
        return elements;
    }
    _getObjectById(elementId, category) {
        if (!elementId || elementId == null || elementId == "") return null;
        let record = this._db?.[elementId];
        let object = record?.[category];
        return object;
    }
    _getObjectByElement(element, category) {
        if (!element || element == null || element == "") return null;
        let elementId = element.id;
        return this._getObjectById(elementId, category);
    }
    set(value1, category, object) {
        if (!value1 || value1 == null || value1 == "") return false;
        if (value1 instanceof Element || value1 instanceof Document) this._setObjectByElement(value1, category, object);
        else this._setObjectById(value1, category, object);
    }
    setElement(element) {
        // Set id
        let elementId = element.id;
        if (!elementId || elementId == null || elementId == "") {
            element.id = String(crypto.randomUUID());
            elementId = element.id;
        }
        this._setObjectById(elementId, "_element", element);
    }
    _setObjectByElement(element, category, object) {
        if (!element || element == null || element == "") return false;
        if (!category || category == null) this.setElement(value);
        // Set id
        let elementId = element.id;
        if (!elementId || elementId == null || elementId == "") {
            element.id = String(crypto.randomUUID());
            elementId = element.id;
        }
        // Set element
        this.setElement(element, element);
        // Set object
        return this._setObjectById(elementId, category, object);
    }
    _setObjectById(elementId, category, object) {
        // Set id
        if (!elementId || elementId == null || elementId == "") return false;
        let record = this._db?.[elementId];
        if (!record || record == null) {
            record = {};
            this._db[elementId] = record;
        }
        // Store object
        record[category] = object;
    }
}



const $05b54ffb0ba8dff2$export$48c809198c5fc082 = {
    getParent: $05b54ffb0ba8dff2$var$getParentElement,
    getParentTop: $05b54ffb0ba8dff2$var$getParentElementTop,
    getChildren: $05b54ffb0ba8dff2$var$getChildrenElement,
    getChildrenAll: $05b54ffb0ba8dff2$var$getChildrenElementAll,
    getType: $05b54ffb0ba8dff2$var$getElementType,
    getNextType: $05b54ffb0ba8dff2$var$getElementNextType,
    redrawTemplate: $05b54ffb0ba8dff2$var$redrawFromTemplate,
    redrawTemplateId: $05b54ffb0ba8dff2$var$redrawFromTemplateID,
    redrawValue: $05b54ffb0ba8dff2$var$redrawValue,
    removeChildren: $05b54ffb0ba8dff2$var$removeChildren
};
function $05b54ffb0ba8dff2$var$getElementType(element) {
    if (element.classList.contains("krThing")) return "krThing";
    if (element.classList.contains("krProperty")) return "krProperty";
    if (element.classList.contains("krValue")) return "krValue";
    return null;
}
function $05b54ffb0ba8dff2$var$getElementNextType(element) {
    // Returns next type in hierarchy
    let elementType = $05b54ffb0ba8dff2$var$getElementType(element);
    switch(elementType){
        case "krThing":
            return "krProperty";
        case "krProperty":
            return "krValue";
        case "krValue":
            return "krThing";
        default:
            return null;
    }
}
function $05b54ffb0ba8dff2$var$getParentElement(element, className) {
    if (!element || element == null) return undefined;
    return element.closest("." + className) || undefined;
}
function $05b54ffb0ba8dff2$var$getParentElementTop(element, className) {
    let topParent = undefined;
    let item = element;
    while(item){
        if (item.classList.includes(className)) topParent = item;
        item = item.parentElement;
    }
    return topParent;
}
function $05b54ffb0ba8dff2$var$getChildrenElement(element, classToGet, classToStop, attributeID1, attributeValue1, attributeID2, attributeValue2) {
    // Get a specific children element
    let childrenElements = $05b54ffb0ba8dff2$var$getChildrenElementAll(element, classToGet, classToStop);
    for (let e of childrenElements){
        if (attributeID1 && attributeID1 != null) {
            let pv1 = e.getAttribute(attributeID1);
            if (pv1 != attributeValue1) continue;
        }
        if (attributeID2 && attributeID2 != null) {
            let pv2 = e.getAttribute(attributeID2);
            if (pv2 != attributeValue2) continue;
        }
        return e;
    }
    return undefined;
}
function $05b54ffb0ba8dff2$var$getChildrenElementAll(element, classToGet, classToStop, attributeID1, attributeValue1, attributeID2, attributeValue2) {
    // Get a specific children element
    let results = [];
    let childrenElements = $05b54ffb0ba8dff2$var$_getAllChildren(element, classToGet, classToStop);
    for (let e of childrenElements){
        if (attributeID1 && attributeID1 != null) {
            let pv1 = e.getAttribute(attributeID1);
            if (pv1 != attributeValue1) continue;
        }
        if (attributeID2 && attributeID2 != null) {
            let pv2 = e.getAttribute(attributeID2);
            if (pv2 != attributeValue2) continue;
        }
        results.push(e);
    }
    return results;
}
function $05b54ffb0ba8dff2$var$_getAllChildren(element, classToGet, classToStop) {
    let results = [];
    for (let e of element.children){
        if (e.classList.contains(classToStop)) continue;
        if (e.classList.contains(classToGet)) results.push(e);
        let v = $05b54ffb0ba8dff2$var$_getAllChildren(e, classToGet, classToStop);
        if (v.length > 0) results = results.concat(v);
    }
    return results;
}
function $05b54ffb0ba8dff2$var$removeChildren(element, classToGet, classToStop, attributeID, attributeValues) {
    // Remove children that is not in the list of attribute Values
    if (!Array.isArray(attributeValues)) attributeValues = [
        attributeValues
    ];
    let childrens = $05b54ffb0ba8dff2$var$_getAllChildren(element, classToGet, classToStop);
    for (let e of childrens){
        let propertyValue = e.getAttribute(attributeID);
        if (!attributeValues.includes(propertyValue)) e.remove();
    }
}
// -----------------------------------------------------
//  Redraw
// -----------------------------------------------------
function $05b54ffb0ba8dff2$var$redrawValue(element, record_type, key, value, options) {
    element.innerHTML = (0, $5OpyM$krakenHtml).base.value(value, record_type, key, options);
}
function $05b54ffb0ba8dff2$var$replaceRecordIds(element) {
    element.id = String(crypto.randomUUID());
    for (let e of element.children)$05b54ffb0ba8dff2$var$replaceRecordIds(e);
}
function $05b54ffb0ba8dff2$var$redrawFromTemplate(element, template) {
    let temp = document.createElement("div");
    temp.innerHTML = template;
    //replaceRecordIds(temp)
    element.innerHTML = "";
    while(temp.firstElementChild)element.appendChild(temp.firstElementChild);
    return;
}
function $05b54ffb0ba8dff2$var$redrawFromTemplateID(element, templateID, value, options) {
    try {
        element.innerHTML = (0, $5OpyM$krakenHtml).form?.[templateID](value, options);
    } catch (error) {
        try {
            element.innerHTML = (0, $5OpyM$krakenHtml).components[templateID](value, options);
        } catch (error) {
            try {
                element.innerHTML = (0, $5OpyM$krakenHtml).blocks[templateID](value, options);
            } catch (error) {
                try {
                    element.innerHTML = (0, $5OpyM$krakenHtml).base[templateID](value, options);
                } catch (error) {}
            }
        }
    }
    return;
}



function $78ff735ab35d7d67$export$5b99ca8578881576(element) {
    // Formats the element prior to use
    $78ff735ab35d7d67$var$preFormatReplacePlaceHolders(element);
    $78ff735ab35d7d67$var$preFormatMissingClasses(element);
    $78ff735ab35d7d67$var$preFormatMissingParentThing(element);
    $78ff735ab35d7d67$var$preFormatMissingThing(element);
    $78ff735ab35d7d67$var$preFormatReplaceKrValue(element);
    $78ff735ab35d7d67$var$preFormatInsertBody(element);
    for (let e of element.children)$78ff735ab35d7d67$export$5b99ca8578881576(e);
}
function $78ff735ab35d7d67$var$preFormatReplacePlaceHolders(element) {
    // Replace references in {{ }} like {{ name }} or {{ item.name }} with properties
    // Get text nodes
    let textNodes = [];
    for (let node of element.childNodes)if (node.nodeType == 3) textNodes.push(node);
    for (let node of textNodes){
        const content = node.nodeValue;
        if (!content || content == null || content == "") return;
        const properties = content.match(/\{\{(.*?)\}\}/g);
        if (!properties || properties == null) return;
        for (let p of properties){
            let word = p.replace("{{", "");
            word = word.replace("}}", "");
            word = word.trim();
            let path = word.split(".");
            let newContent = "";
            // Open property
            for (let p of path)newContent += `<span class="krProperty" data-propertyID="${p}">`;
            // Close properties
            for (let p of path)newContent = newContent + "</span>";
            // Update element textContent
            node.nodeValue = content.replace(p, "");
            let temp = document.createElement("span");
            temp.innerHTML = newContent;
            element.appendChild(temp);
        }
    }
}
function $78ff735ab35d7d67$var$preFormatMissingClasses(element) {
    // Converts elements with proper attributes to proper class 
    let record_type = element.getAttribute("data-record-type");
    let record_id = element.getAttribute("data-record-id");
    let propertyID = element.getAttribute("data-propertyID");
    let valueID = element.getAttribute("data-valueID");
    let record_type_null = !record_type || record_type == null || record_type == "";
    let record_id_null = !record_id || record_id == null || record_id == "";
    let record_propertyID_null = !propertyID || propertyID == null || propertyID == "";
    let record_valueID_null = !valueID || valueID == null || valueID == "";
    // Convert to krThing if type and id but not property
    if (record_type_null == false && record_id_null == false && record_propertyID_null == true) element.classList.add("krThing");
    // Convert to krProperty if type and id but not property
    if (record_propertyID_null == false && record_valueID_null == true) element.classList.add("krProperty");
    // Convert to krProperty if type and id but not property
    if (record_valueID_null == false) element.classList.add("krValue");
}
function $78ff735ab35d7d67$var$preFormatMissingParentThing(element) {
    if (element.classList.contains("krProperty")) {
        // If not krThing above, insert krThing
        let thingElement = (0, $05b54ffb0ba8dff2$export$48c809198c5fc082).getParent(element, "krThing", "krProperty");
        if (!thingElement || thingElement == null) {
            let parentElement = $78ff735ab35d7d67$var$insertParentElement(element, "krThing");
            parentElement.classList.add("kr-added-missing-parent-thing");
            parentElement.setAttribute("data-record-type", element.getAttribute("data-record-type"));
            parentElement.setAttribute("data-record-id", element.getAttribute("data-record-id"));
        }
    }
}
function $78ff735ab35d7d67$var$preFormatMissingThing(element) {
    if (element.classList.contains("krProperty")) {
        // If property child of another property, insert krThing
        let childProperties = (0, $05b54ffb0ba8dff2$export$48c809198c5fc082).getChildrenAll(element, "krProperty", "krThing");
        for (let e of childProperties)$78ff735ab35d7d67$var$insertParentElement(e, "krThing");
    }
}
function $78ff735ab35d7d67$var$preFormatReplaceKrValue(element) {
    if (element.classList.contains("krProperty")) {
        // Remove krValue
        let childValues = (0, $05b54ffb0ba8dff2$export$48c809198c5fc082).getChildrenAll(element, "krValue", "krProperty");
        // Repalce child values
        for (let e of childValues){
            // get value body
            let valueBody = (0, $05b54ffb0ba8dff2$export$48c809198c5fc082).getChildren(e, "krValueBody", "krProperty");
            if (valueBody && valueBody != null) {
                while(e.firstElementChild)e.parentElement.appendChild(e.firstElementChild);
                e.remove();
            } else {
                e.classList.add("krValueBody");
                e.classList.remove("krValue");
            }
        }
    }
}
function $78ff735ab35d7d67$var$preFormatInsertBody(element) {
    // Inserts a krXXXBody elementif missing one
    let elementType = (0, $05b54ffb0ba8dff2$export$48c809198c5fc082).getType(element);
    if (!elementType || elementType == null) return;
    let elementNextType = (0, $05b54ffb0ba8dff2$export$48c809198c5fc082).getNextType(element);
    let bodyElement = (0, $05b54ffb0ba8dff2$export$48c809198c5fc082).getChildren(element, elementType + "Body", elementNextType);
    if (!bodyElement || bodyElement == null) $78ff735ab35d7d67$var$insertChildElement(element, elementType + "Body");
}
function $78ff735ab35d7d67$var$insertParentElement(element, className) {
    let temp = document.createElement("span");
    temp.classList.add(className);
    element.after(temp);
    temp.appendChild(element);
    return temp;
}
function $78ff735ab35d7d67$var$insertChildElement(element, className) {
    // Inserts a child between current element and childrens
    let temp = document.createElement("span");
    temp.classList.add(className);
    while(element.firstElementChild)temp.appendChild(element.firstElementChild);
    element.appendChild(temp);
    return temp;
}


function $885e16236d3d1483$export$20a50f43c11c4220(BaseElement) {
    BaseElement.element.draggable = true;
    BaseElement.element.addEventListener("dragstart", (event)=>{
        event.dataTransfer.setData("text/plain", JSON.stringify(BaseElement.thing.record));
    });
}


function $a949cee925a6875d$export$55e0615b5e4a24cd(BaseElement) {
    console.log("test");
    BaseElement.element.addEventListener("dragover", (event)=>{
        event.preventDefault();
        event.stopPropagation();
    });
    BaseElement.element.addEventListener("drop", (event)=>{
        event.preventDefault();
        event.stopPropagation();
        console.log("drop");
        if (BaseElement.propertyID == "itemListElement") BaseElement.thing.l.add(JSON.parse(event.dataTransfer.getData("text/plain")));
        else BaseElement.thing.p.add(BaseElement.propertyID, JSON.parse(event.dataTransfer.getData("text/plain")));
        BaseElement.redraw();
    });
}


function $f9160f8a115381cc$export$3d8146d013329dbe(BaseElement, DB) {
    BaseElement.element.draggable = true;
    BaseElement.element.addEventListener("dragstart", (event)=>{
        event.dataTransfer.setData("text/plain", JSON.stringify(BaseElement.thing.record));
        event.target.classList.add("dragging");
    });
    BaseElement.element.addEventListener("dragend", (event)=>{
        event.dataTransfer.setData("text/plain", JSON.stringify(BaseElement.thing.record));
        event.target.classList.add("dragging");
    });
    BaseElement.element.addEventListener("dragover", (event)=>{
        event.preventDefault();
        event.stopPropagation();
    });
    BaseElement.element.addEventListener("drop", (event)=>{
        event.preventDefault();
        event.stopPropagation();
        console.log("Reorder drop");
        let draggingElement = document.querySelector(".dragging");
        if (!draggingElement) return;
        console.log(draggingElement);
        draggingElement.classList.remove("dragging");
        let draggingObject = DB.get(draggingElement);
        let dropzoneObject = DB.get(event.currentTarget);
        console.log(draggingObject.thing.ref);
        console.log(dropzoneObject.thing.ref);
        let item = event.currentTarget;
        let itemList = null;
        while(item){
            console.log(item.tagName);
            if (item.classList.contains("krThing")) {
                let temp = DB.get(item);
                if (temp.record_type == "ItemList") {
                    itemList = temp;
                    break;
                }
            }
            item = item.parentElement;
        }
        if (itemList) {
            console.log(itemList.thing.ref);
            itemList.thing.l.insertBefore(draggingObject.thing.ref, dropzoneObject.thing.ref);
        }
        BaseElement.redraw();
    });
}


function $ea6a1aa002c1ee98$export$60e96fb0202719e5(BaseElement, DB) {
    if (BaseElement.element.classList.contains("krDrag")) (0, $885e16236d3d1483$export$20a50f43c11c4220)(BaseElement, DB);
    if (BaseElement.element.classList.contains("krDrop")) (0, $a949cee925a6875d$export$55e0615b5e4a24cd)(BaseElement, DB);
    if (BaseElement.element.classList.contains("krReorder")) (0, $f9160f8a115381cc$export$3d8146d013329dbe)(BaseElement, DB);
}


class $e94b95890d745234$export$cf8e76dd85f3d02 {
    constructor(element){
        this.db = new (0, $eed02460515008be$export$261128914cda1d44)();
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
        this.redraw();
    }
    _initElement() {
        if (!this._element || this._element == null) return;
        if (this.elementType == "krThing") this._initElementThing();
        if (this.elementType == "krProperty") this._initElementProperty();
        if (this.elementType == "krValue") this._initElementValue();
    }
    _initElementThing() {
        (0, $78ff735ab35d7d67$export$5b99ca8578881576)(this.element);
        this._setID();
        this.properties.map((x)=>x._initElement());
        this.db.set(this.element, "KrElementClass", this);
        if (this.thingDb && this.thingDb != null) {
            if (this.record_type && this.record_id) {
                this.thingDb.addEventListener(this, this.record_type, this.record_id);
                this.thingDb.get(this.record_type, this.record_id);
            }
        }
        (0, $ea6a1aa002c1ee98$export$60e96fb0202719e5)(this);
    }
    _initElementProperty() {
        (0, $78ff735ab35d7d67$export$5b99ca8578881576)(this.element);
        this._setID();
        this.values.map((x)=>x._initElement());
        this._getTemplate();
        this.db.set(this.element, "KrElementClass", this);
        (0, $ea6a1aa002c1ee98$export$60e96fb0202719e5)(this);
    }
    _initElementValue() {
        (0, $78ff735ab35d7d67$export$5b99ca8578881576)(this.element);
        this._setID();
        this.things.map((x)=>x._initElement());
        this.db.set(this.element, "KrElementClass", this);
        (0, $ea6a1aa002c1ee98$export$60e96fb0202719e5)(this);
    }
    _blankRecordIds(element) {
        element.id = ""; //String(crypto.randomUUID())''
        element.setAttribute("kr-db-stored", false);
        for (let e of element.children)this._blankRecordIds(e);
    }
    _getTemplate() {
        if (this.body.innerHTML != "") {
            this._blankRecordIds(this.body);
            this.template = this.body.innerHTML;
            this.body.innerHTML = "";
        }
    }
    _setID() {
        if (!this._element.id || this._element.id == null || this._element.id == "") this._element.id = String(crypto.randomUUID());
    }
    // -----------------------------------------------------
    //  Element attribute
    // -----------------------------------------------------
    convertToKrElement(element) {
        if (Array.isArray(element)) {
            let results = [];
            for (let e of element){
                let obj = this.convertToKrElement(e);
                if (obj && obj != null) results.push(obj);
            }
            return results;
        }
        if (!element || element == null) return null;
        // Get from db
        let obj = this.db.get(element, "KrElementClass");
        // Create if KrElement doesn't exist
        if (!obj || obj == null) {
            obj = new $e94b95890d745234$export$cf8e76dd85f3d02(element);
            this.db.set(element, "KrElementClass", obj);
        }
        return obj;
    }
    // Parent
    get parentThing() {
        return this.convertToKrElement((0, $05b54ffb0ba8dff2$export$48c809198c5fc082).getParent(this.element, "krThing"));
    }
    get parentProperty() {
        return this.convertToKrElement((0, $05b54ffb0ba8dff2$export$48c809198c5fc082).getParent(this.element, "krProperty"));
    }
    get parentValue() {
        return this.convertToKrElement((0, $05b54ffb0ba8dff2$export$48c809198c5fc082).getParent(this.element, "krValue"));
    }
    // Children
    get things() {
        return this.convertToKrElement((0, $05b54ffb0ba8dff2$export$48c809198c5fc082).getChildrenAll(this.element, "krThing", "krProperty"));
    }
    get properties() {
        return this.convertToKrElement((0, $05b54ffb0ba8dff2$export$48c809198c5fc082).getChildrenAll(this.element, "krProperty", "krValue"));
    }
    get values() {
        return this.convertToKrElement((0, $05b54ffb0ba8dff2$export$48c809198c5fc082).getChildrenAll(this.element, "krValue", "krThing"));
    }
    // Databases
    get thingDb() {
        return this.db.get((0, $05b54ffb0ba8dff2$export$48c809198c5fc082).getParent(this.element, "kr-db"), "KrThingDb");
    }
    // Sections
    get header() {
        let section = "Header";
        let elementType = (0, $05b54ffb0ba8dff2$export$48c809198c5fc082).getType(this.element);
        let nextElementType = (0, $05b54ffb0ba8dff2$export$48c809198c5fc082).getNextType(this.element);
        return (0, $05b54ffb0ba8dff2$export$48c809198c5fc082).getChildren(this.element, elementType + section, nextElementType);
    }
    get body() {
        let section = "Body";
        let elementType = (0, $05b54ffb0ba8dff2$export$48c809198c5fc082).getType(this.element);
        let nextElementType = (0, $05b54ffb0ba8dff2$export$48c809198c5fc082).getNextType(this.element);
        return (0, $05b54ffb0ba8dff2$export$48c809198c5fc082).getChildren(this.element, elementType + section, nextElementType);
    }
    get footer() {
        let section = "Footer";
        let elementType = (0, $05b54ffb0ba8dff2$export$48c809198c5fc082).getType(this.element);
        let nextElementType = (0, $05b54ffb0ba8dff2$export$48c809198c5fc082).getNextType(this.element);
        return (0, $05b54ffb0ba8dff2$export$48c809198c5fc082).getChildren(this.element, elementType + section, nextElementType);
    }
    get action() {
        let section = "Action";
        let elementType = (0, $05b54ffb0ba8dff2$export$48c809198c5fc082).getType(this.element);
        let nextElementType = (0, $05b54ffb0ba8dff2$export$48c809198c5fc082).getNextType(this.element);
        return (0, $05b54ffb0ba8dff2$export$48c809198c5fc082).getChildren(this.element, elementType + section, nextElementType);
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
        return (0, $05b54ffb0ba8dff2$export$48c809198c5fc082).getType(this.element);
    }
    get record_type() {
        if (this._thing) return this._thing.record_type;
        else return this.element.getAttribute("data-record-type");
    }
    set record_type(value) {
        if (this._thing) this._thing.record_type = value;
        else this.element.setAttribute("data-record-type", value);
    }
    get record_id() {
        if (this._thing) return this._thing.record_id;
        else return this.element.getAttribute("data-record-id");
    }
    set record_id(value) {
        if (this._thing) this._thing.record_id = value;
        else this.element.setAttribute("data-record-id", value);
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
        let thingDb = this.thingDb;
        if (thingDb && thingDb != null) {
            thingDb.set(value);
            thingDb.addEventListener(this, value.record_type, value.record_id);
        }
        //
        this._thing = value;
        if (this.element && this.element != null) {
            this.element.setAttribute("data-record-type", value.record_type);
            this.element.setAttribute("data-record-id", value.record_id);
        }
        this.initObject();
        let temp = this;
        this._thing.addEventListener("all", (event)=>{
            console.log("Thing event");
            temp.redraw();
        });
    }
    get value() {
        let thingObject = this.parentThing;
        let record_type = thingObject.record_type;
        let propertyObject = this.parentProperty;
        let property = this.thing.getProperty(propertyObject.propertyID);
        let pvs = property.propertyValues;
        let value = null;
        for (let pv of pvs)if (pv.record_id == this.valueID) value = pv.value;
        if (value.record_type) value = value.record;
    }
    get templateID() {
        return this.element.getAttribute("data-templateID");
    }
    set templateID(value) {
        this.element.setAttribute("data-templateID", value);
    }
    get options() {
        let record = {
            hostname: "https://test.com",
            path: "/",
            params: {},
            record_type: "Thing",
            record_id: "Thing1"
        };
        return record;
    }
    // -----------------------------------------------------
    //  Redraw
    // -----------------------------------------------------
    redraw() {
        if (!this.thing || this.thing == null) return;
        if (!this.element || this.element == null) return;
        switch(this.elementType){
            case "krThing":
                return this._redrawThing();
            case "krProperty":
                return this._redrawProperty();
            case "krValue":
                return this._redrawValue();
        }
    }
    _redrawThing() {
        let record = this.thing.record;
        if (record?.["@type"]) {
            record._heading1 = record?.name;
            record._heading2 = record?.["@id"];
        }
        // Create properties from template if not already there
        if (!this.properties || this.properties.length == 0) {
            if (this.templateID && this.templateID != null) (0, $05b54ffb0ba8dff2$export$48c809198c5fc082).redrawTemplateId(this.body, this.templateID, record, this.options);
            else if (this.template && this.template != null) (0, $05b54ffb0ba8dff2$export$48c809198c5fc082).redrawTemplate(this.body, this.template, record, this.options);
        }
        // Refresh properties
        if (this.properties.length > 0) {
            for (let p of this.properties)if (p) p.redraw();
        }
    }
    _redrawProperty() {
        let property = this.thing.getProperty(this.propertyID);
        let pvs = property.propertyValues;
        // Remove values no longer present
        let pvIDs = pvs.map((x)=>x.record_id);
        (0, $05b54ffb0ba8dff2$export$48c809198c5fc082).removeChildren(this.element, "krValue", "krThing", "valueID", pvIDs);
        let item;
        for (let pv of pvs){
            // Get existing value element
            let valueObject = this.convertToKrElement((0, $05b54ffb0ba8dff2$export$48c809198c5fc082).getChildren(this.element, "krValue", "krThing", "valueID", pv.record_id));
            // Create if not already present
            if (!valueObject || valueObject == null) {
                let valueElement = document.createElement("span");
                valueElement.classList.add("krValue");
                valueElement.setAttribute("data-valueID", pv.record_id);
                valueObject = new $e94b95890d745234$export$cf8e76dd85f3d02(valueElement);
                this.db.set(valueObject.element, "KrElementClass", valueObject);
            }
            // Add to document
            if (item) item.after(valueObject.element);
            else this.body.prepend(valueObject.element);
            valueObject.redraw();
        }
    }
    _redrawValue() {
        if (!this.body || this.body == null) {
            // Add body if missing one
            let temp = document.createElement("span");
            while(this.element.firstElementChild)temp.appendChild(this.element.firstElementChild);
            this.element.innerHTML = this.getValueTemplate();
            while(temp.firstElementChild)this.body.appendChild(temp.firstElementChild);
        }
        let thingObject = this.parentThing;
        let record_type = thingObject.record_type;
        let propertyObject = this.parentProperty;
        let property = this.thing.getProperty(propertyObject.propertyID);
        let pvs = property.propertyValues;
        let value = null;
        for (let pv of pvs)if (pv.record_id == this.valueID) value = pv.value;
        if (propertyObject.templateID) {
            let record = value.record || value;
            if (record["@type"]) {
                record._heading1 = record?.name;
                record._heading2 = record?.url;
            }
            (0, $05b54ffb0ba8dff2$export$48c809198c5fc082).redrawTemplateId(this.body, propertyObject.templateID, record, this.options);
        } else if (propertyObject.template) (0, $05b54ffb0ba8dff2$export$48c809198c5fc082).redrawTemplate(this.body, propertyObject.template);
        else (0, $05b54ffb0ba8dff2$export$48c809198c5fc082).redrawValue(this.body, record_type, propertyObject.propertyID, value.record || value, this.options);
        // COnvert child things to objects
        if (this.things && this.things.length > 0) for (let t of this.things){
            t.thing = value;
            t.redraw();
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



class $7323cc65eec8b764$export$c66b30b6b8f5a1b3 extends HTMLElement {
    constructor(elementClass, htmlTemplateID){
        super();
        this.elementClass = elementClass;
        this.htmlTemplateID = htmlTemplateID;
        this.KrElement = null;
    }
    initObject() {
        this.classList.add(this.elementClass);
        this.KrElement = new (0, $e94b95890d745234$export$cf8e76dd85f3d02)(this);
        if (this.htmlTemplateID && this.htmlTemplateID != null) this.KrElement.templateID = this.htmlTemplateID;
        if (this.htmlTemplate && this.htmlTemplate != null && this.htmlTemplate != "") {
            this.KrElement.template = this.htmlTemplate;
            this.KrElement.redraw();
        }
    }
    get htmlTemplate() {
        return "bob";
    }
    get template() {
        return "";
    }
    get thing() {
        return this.KrElement.thing;
    }
    set thing(value) {
        this.KrElement.thing = value;
    }
    redraw() {
        this.KrElement.redraw();
    }
    connectedCallback() {
        //this.initObject()
        this.initObject();
    }
    disconnectedCallback() {}
    adoptedCallback() {}
    attributeChangedCallback(name, oldValue, newValue) {}
}
customElements.define("kr-base-component", $7323cc65eec8b764$export$c66b30b6b8f5a1b3);


class $2d33543a9bc71c8e$export$8c1c4e47f3e6175c extends (0, $7323cc65eec8b764$export$c66b30b6b8f5a1b3) {
    constructor(){
        super("krThing", "generic");
    }
}
customElements.define("kr-thing-item", $2d33543a9bc71c8e$export$8c1c4e47f3e6175c);




const $b1a28b5c8853cd88$var$DEFAULT_APIURL = "https://data.krknapi.com";
const $b1a28b5c8853cd88$var$DEFAULT_APIBASEPATH = "/api";
const $b1a28b5c8853cd88$var$DEFAULT_APICOLLECTION = "testComponent";
class $b1a28b5c8853cd88$export$20c9d83c26006bcb {
    /**
     * On page database of things acting aslso as proxy for saving retrieving to API
     * 
     */ constructor(element){
        this._thingDb = new (0, $5OpyM$KrCache)();
        this.callbacks = {};
        this.elementDb = new (0, $eed02460515008be$export$261128914cda1d44)();
        this.element = element;
    }
    initObject() {
        let element = document.createElement("span");
        element.classList.add("kr-db");
        element.id = String(crypto.randomUUID());
        this.elementDb.set(this.element, "KrThingDb", this);
        // Activate element under 
        for (let e of this.element.querySelectorAll(".krThing")){
            let KrElement = this.elementDb.get(e, "KrElementClass");
            if (KrElement && KrElement != null) {
                KrElement.addEventListener(KrElement, KrElement.record_type, KrElement.record_id);
                this.get(KrElement.record_type, KrElement.record_id);
            }
        }
    }
    get element() {
        return this._element;
    }
    set element(value) {
        this._element = value;
        this._element.classList.add("kr-db");
        this.initObject();
    }
    get apiUrl() {
        return this.element.getAttribute("data-apiUrl") || $b1a28b5c8853cd88$var$DEFAULT_APIURL;
    }
    get apiBasePath() {
        return this.element.getAttribute("data-apiBasePath") || $b1a28b5c8853cd88$var$DEFAULT_APIBASEPATH;
    }
    get apiCollection() {
        return this.element.getAttribute("data-apiCollection") || $b1a28b5c8853cd88$var$DEFAULT_APICOLLECTION;
    }
    async initElements() {
        let thingElements = this.element.querySelector(".krThing");
        for (let e of thingElements){
            let record_type = e.getAttribute("data-record-type");
            let record_id = e.getAttribute("data-record-id");
            let thing = await this.get(record_type, record_id);
        }
    }
    async get(record_type, record_id) {
        // Get from local cache
        let thing = this._thingDb.get(record_type, record_id);
        // If not in db, get from api
        if (!thing || thing == null) this._getFromApi(record_type, record_id);
        // Else create
        if (!thing || thing == null) thing = new (0, $5OpyM$KrThing)(record_type, record_id);
        return thing;
    }
    async _getFromApi(record_type, record_id) {
        if (record_type === undefined || record_type == null || record_type == "undefined") return;
        if (!record_id || record_id == null || record_id == "undefined") return;
        if (!this.apiUrl || this.apiUrl == null || this.apiUrl == "") return null;
        let thing = new (0, $5OpyM$KrThing)(record_type, record_id);
        thing.api.apiUrl = this.apiUrl;
        thing.api.apiBasePath = this.apiBasePath;
        thing.api.apiCollection = this.apiCollection;
        let r = await thing.api.get();
        if (r.p.actionStatus == "CompletedActionStatus") {
            this.set(thing);
            return thing;
        }
        return null;
    }
    set(thing) {
        if (!thing || thing == null || !thing.record_type) return;
        let previousThing = this._thingDb.get(thing.record_type, thing.record_id);
        this._thingDb.set(thing);
        // Run callbacks if changed
        if (!previousThing || previousThing == null || JSON.stringify(previousThing.record) != JSON.stringify(thing.record)) this.runCallbacks(thing);
    }
    async save(thing) {
        if (!thing.api.apiUrl || thing.api.apiUrl == null || thing.api.apiUrl == "") return false;
        thing.api.apiUrl = this.apiUrl;
        thing.api.apiBasePath = this.apiBasePath;
        thing.api.apiCollection = this.apiCollection;
        await thing.api.post();
        // Add ot local cache
        this._thingDb.set(thing);
    }
    async saveAll() {
        let things = this._thingDb.things;
        for (let thing of things)await this.save(thing);
    }
    runCallbacks(thing) {
        let KrElements = this.callbacks?.[thing.record_type]?.[thing.record_id];
        for (let k of KrElements)k.thing = thing;
    }
    addEventListener(KrElement, record_type, record_id) {
        if (!record_type || record_type == null) return;
        if (!record_id || record_id == null) return;
        if (!this.callbacks?.[record_type]) this.callbacks[record_type] = {};
        if (!this.callbacks[record_type]?.[record_id]) this.callbacks[record_type][record_id] = [];
        // Check if already in list
        for (let e of this.callbacks[record_type][record_id]){
            if (KrElement === e) return;
        }
        // Add to list
        this.callbacks[record_type][record_id].push(KrElement);
    }
}


class $6211005fb3be0701$export$662db0d4991580e7 extends HTMLElement {
    constructor(){
        super();
        this._thingDB = null;
    }
    initObject() {
        console.log("Init thing db component");
        this._initElement();
        this._thingDb = new (0, $b1a28b5c8853cd88$export$20c9d83c26006bcb)(this.element);
    }
    get element() {
        return this;
    }
    _initElement() {
        let temp = document.createElement("span");
        temp.innerHTML = this.htmlTemplate;
        let body = temp.querySelector(".krDbBody");
        while(this.element.firstChild)body.appendChild(this.element.firstChild);
        this.element.appendChild(temp);
    }
    get htmlTemplate() {
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

    `;
    }
    connectedCallback() {
        //this.initObject()
        this.initObject();
    }
    disconnectedCallback() {}
    adoptedCallback() {}
    attributeChangedCallback(name, oldValue, newValue) {}
}
customElements.define("kr-thing-db", $6211005fb3be0701$export$662db0d4991580e7);



class $d367a037f9d683c7$export$dfa6d9fd0c4c7692 extends (0, $7323cc65eec8b764$export$c66b30b6b8f5a1b3) {
    constructor(){
        super("krProperty");
        this.classList.add("krProperty");
    }
}
customElements.define("kr-property", $d367a037f9d683c7$export$dfa6d9fd0c4c7692);



class $9bdea00dc69ae40a$export$b209f37753111ed6 extends (0, $7323cc65eec8b764$export$c66b30b6b8f5a1b3) {
    constructor(){
        super("krValue");
        this.classList.add("krValue");
    }
}
customElements.define("kr-value", $9bdea00dc69ae40a$export$b209f37753111ed6);



class $ab5997bbb2cf6611$export$3cb90624c3647f94 extends (0, $7323cc65eec8b764$export$c66b30b6b8f5a1b3) {
    constructor(){
        super("krThing", "generic");
    }
}
customElements.define("kr-record", $ab5997bbb2cf6611$export$3cb90624c3647f94);



class $57975007b42dcf30$export$4b144c8bbc4ed2b6 extends (0, $7323cc65eec8b764$export$c66b30b6b8f5a1b3) {
    constructor(){
        super("krThing", "card");
    }
}
customElements.define("kr-card", $57975007b42dcf30$export$4b144c8bbc4ed2b6);



class $aacb19e1c7867498$export$607bd89059e6828e extends (0, $7323cc65eec8b764$export$c66b30b6b8f5a1b3) {
    constructor(){
        super("krThing", null);
    }
    get htmlTemplate() {
        return `

        <h1> Tes223</h1>

        <div class="krProperty" data-propertyID="name">
          <h1><span class="krValue"></span></h1>
        </div>

        <div class="krProperty krDrop" data-propertyID="itemListElement">
          <kr-list-item class="krReorder"></kr-list-item>
        </div>    

    `;
    }
}
customElements.define("kr-list", $aacb19e1c7867498$export$607bd89059e6828e);



class $e3b5b019f24969f6$export$61fb2ce45157810c extends (0, $7323cc65eec8b764$export$c66b30b6b8f5a1b3) {
    constructor(){
        super("krThing", null);
    }
    get htmlTemplate() {
        return `

        <div class="row m-2">
              <div class="col krProperty" data-propertyID="position">

              </div>

              <div class="col krProperty" data-propertyID="item">
                <kr-card></kr-card>
              </div>
        </div>

    `;
    }
}
customElements.define("kr-list-item", $e3b5b019f24969f6$export$61fb2ce45157810c);



class $d0adf6a54097c6b6$export$ec47c2c81113bb5f extends (0, $7323cc65eec8b764$export$c66b30b6b8f5a1b3) {
    constructor(){
        super("krThing");
    }
    get htmlTemplate() {
        return `

        <li>
            <a class="dropdown-item">
                    
                    <span class="krProperty"data-propertyID="image"><kr-avatar></kr-avatar> </span>
                    <span class="krProperty" data-propertyID="name"></span>
            </a>
        </li>

    `;
    }
}
customElements.define("kr-action-menu-item", $d0adf6a54097c6b6$export$ec47c2c81113bb5f);



class $16dfca572914fe73$export$58d42cdddbf7a709 extends (0, $7323cc65eec8b764$export$c66b30b6b8f5a1b3) {
    constructor(){
        super("krProperty");
    }
    get htmlTemplate() {
        return `

         <div class="dropdown">
        <a class="btn p-0" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"  fill="currentColor" class="bi bi-three-dots-vertical" >
                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
            </svg>

        </a>

        <ul class="dropdown-menu">

            
            <kr-action-menu-item>
            
            </kr-action-menu-item>

        
        </ul>
    </div>

    `;
    }
}
customElements.define("kr-action-menu", $16dfca572914fe73$export$58d42cdddbf7a709);



class $bf53510f82d8eae1$export$9f1dfb2a0ceb2d85 extends (0, $7323cc65eec8b764$export$c66b30b6b8f5a1b3) {
    constructor(){
        super("krThing", "mediaAvatar");
    }
}
customElements.define("kr-avatar", $bf53510f82d8eae1$export$9f1dfb2a0ceb2d85);







class $e69f9ce23ebc7c8e$export$850a3ce9851fb723 extends HTMLElement {
    constructor(){
        super();
    }
    initObject() {
        this.classList.add(this.elementClass);
        let record_type = this.getAttribute("data-record-type");
        console.log(record_type);
        let k = (0, $5OpyM$KrakenSchemas).get(record_type);
        let jsonSchema = k.jsonSchemaLight;
        console.log(jsonSchema);
        let content = (0, $5OpyM$krakenHtml).form.generic("https://www.test.com", "Thing", null, "en-US", true);
        this.innerHTML = content;
    }
    connectedCallback() {
        //this.initObject()
        this.initObject();
    }
    disconnectedCallback() {}
    adoptedCallback() {}
    attributeChangedCallback(name, oldValue, newValue) {}
}
customElements.define("kr-form", $e69f9ce23ebc7c8e$export$850a3ce9851fb723);


const $034202d93aa8b171$export$bd50e30f3016e7fd = {
    thing: (0, $2d33543a9bc71c8e$export$8c1c4e47f3e6175c),
    thingDb: (0, $6211005fb3be0701$export$662db0d4991580e7),
    property: (0, $d367a037f9d683c7$export$dfa6d9fd0c4c7692),
    value: (0, $9bdea00dc69ae40a$export$b209f37753111ed6),
    record: (0, $ab5997bbb2cf6611$export$3cb90624c3647f94),
    card: (0, $57975007b42dcf30$export$4b144c8bbc4ed2b6),
    base: (0, $e94b95890d745234$export$cf8e76dd85f3d02),
    list: (0, $aacb19e1c7867498$export$607bd89059e6828e),
    listItem: (0, $e3b5b019f24969f6$export$61fb2ce45157810c),
    actionMenuItem: (0, $d0adf6a54097c6b6$export$ec47c2c81113bb5f),
    actionMenu: (0, $16dfca572914fe73$export$58d42cdddbf7a709),
    avatar: (0, $bf53510f82d8eae1$export$9f1dfb2a0ceb2d85),
    form: (0, $e69f9ce23ebc7c8e$export$850a3ce9851fb723)
};




//# sourceMappingURL=main.js.map
