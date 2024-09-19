
import { krakenHtml } from "krakenhtml";


export const helper = {
    getType: getElementType,
    getSection: getSection, 
    parent: {
        thing: _getParentThing,
        property: _getParentProperty,
        value: _getParentValue
    },
    children: {
        things: _getChildrenThings,
        properties: _getChildrenProperties,
        values: _getChildrenValues
    },
    record: {
        html: getHtmlRecord
    },
    redraw: {
        thing: _refreshThingElement
    },
    _getChildrenProperties: _getChildrenProperties,
    _removeAbsentValues: _removeAbsentValues,
    getSection: getSection
    
    
}

function getElementType(element){
    if(element.classList.contains('krThing')){ return 'thing' }
    if(element.classList.contains('krProperty')){ return 'property' }
    if(element.classList.contains('krValue')){ return 'value' }

    if(element.tagName =='kr-thing'){ return 'thing' }
    if(element.tagName =='kr-property'){ return 'property' }
    if(element.tagName =='kr-value'){ return 'value' }
    
    return null
    
}



function getSection(element, sectionName){
    
    if(element.tagName == sectionName){
        return element
    }
    for(let e of element.children){

        if(e.classList.contains('krThing')){
            continue
        }
        if(e.classList.contains('krProperty')){
            continue
        }
        if(e.classList.contains('krValue')){
            continue
        }
        if(e.tagName == 'header'){
            continue
        }
        if(e.tagName == 'body'){
            continue
        }
        if(e.tagName == 'footer'){
            continue
        }
        
    }
    return undefined
    
   
    
    
}
    


function getFirstChildren(element, classToGet, classToStop){

    if(element.classList.contains(classToGet)){
        return element
    }
    for(let e of element.children){
        if(!e.classList.contains(classToStop)){
            let v = getFirstChildren(e, classToGet, classToStop)
            if(v){
                return v
            }
        }
    }
    return undefined
}




function _getChildrenThings(element){
    return _getAllChildren(element, 'krThing', 'krProperty')
}
function _getChildrenThing(element, record_type, record_id){
    let elements = _getChildrenThings(element)
    let results = elements.filter(x => x.record_type == record_type && x.record_id == record_id)
    return results
}
    
export function _getChildrenProperties(element){
    return _getAllChildren(element, 'krProperty', 'krThing')
}

function _getChildrenProperty(element, propertyID){
    let elements = _getChildrenProperties(element)
    let results = elements.filter(x => x.propertyID == propertyID)
    return results
}

function _getChildrenValues(element){
    return _getAllChildren(element, 'krValue', 'krThing')
}
export function _getChildrenValue(element, valueID){
    let elements = _getChildrenValues(element)
    let results = elements.filter(x => x.valueID == valueID)
    return results
}



function _getAllChildren(element, classToGet, classToStop){

    let results = []
    if(element.classList.contains(classToGet)){
        results.push(element)
    }
    
    for(let e of element.children){
        
        if(!e.classList.contains(classToStop)){
            let v = _getAllChildren(e, classToGet, classToStop)
            if(v.length > 0){
                results = results.concat(v) 
            }
        }
    }
    return results
}


function _getParentThing(element){
    return element.closest('.krThing') || undefined
}

function _getParentProperty(element){
    return element.closest('.krProperty') || undefined
}

function _getParentValue(element){
    return element.closest('.krValue') || undefined
}


function getHtmlRecord(thing){

    let record = thing.record
    record._heading1 = thing.headings.heading1
    record._heading2 = thing.headings.heading2
    return record
    
}


function _refreshThingElement(thingElement, thing, thingTemplate, options){

    // Remove properties gone
    _removeAbsentProperties(thingElement, thing)

    //
    options = {
            hostname:'https://test.com' ,
            path: '/' ,
            params: {} ,
            record_type: thing.record_type,
            record_id: thing.record_id
        };

    
    // 
    let propertyElements = _getChildrenProperties(thingElement)

    // Recreate element if no properties, else refresh properties
    if(propertyElements.length == 0){
        let record = getHtmlRecord(thing);
        let content = krakenHtml.components[thingTemplate](record, options);
        thingElement.innerHTML = content;
    } else {

        for(let p of propertyElements){
            _refreshPropertyElement(p, thing)
        }
    }
    
}


export function _removeAbsentProperties(thingElement, thing){

    // Remove propertyelements no longer in thing
    let properties = thing.properties.map(x => x.propertyID)
    for (let e of _getChildrenProperties(thingElement)){

        if(!properties.includes(e.propertyID)){
            e.remove()
        }
    }
}

export function _removeAbsentValues(propertyElement, thing){

    // Remove propertyElements no longer in thing
    let propertyID = propertyElement.propertyID
    let property = thing.getProperty(propertyID)
    let propertyValues = property.propertyValues

    let valueIDs = propertyValues.map(x => x.record_id)

    


    let valueElements = _getChildrenValues(propertyElement)
    for(let v of valueElements){
        if(!valueIDs.contains(v.valueID)){
            v.remove()
        }
    }
    
}




function _refreshPropertyElement(propertyElement, thing, valueTemplate){

    // 
    let propertyID = propertyElement.propertyID

    // Remove absent values
    _removeAbsentValues(thingElement, thing, propertyID)

    // 
    let property = thing.property(propertyID)
    let propertyValues = property.propertyValues

    let item 
    
    for(let v of propertyValues){

        let element = _getOrCreateValueElement(propertyElement, v.record_id, valueTemplate)

        if(item){
            item.after(element)
        } else {
            getPropertyBody.insertBefore(propertyElement)
            item = element
        }   
    }
}


function _getOrCreateValueElement(propertyElement, valueID, valueTemplate){

    let valueElement = _getChildrenValues(propertyElement, valueID)

    if(!valueElement.length == 0){
        if(valueTemplate && valueTemplate!= null){
            let newValueElement = _createValueElement(valueID, valueTemplate)
            valueElement.push(newValueElement)   
        } else {
            let newValueElement = document.createElement('span')
            newValueElement.innerHTML = `<span class="krValueHeader></span><span class="krValueBody></span>"`
            
        }
    }

    return valueElement[0]
    
}

function _createValueElement(valueID, valueTemplate){

    let newValueElement = document.createElement(valueTemplate)
    newValueElement.valueID = valueID
    return newValueElement
    
}


