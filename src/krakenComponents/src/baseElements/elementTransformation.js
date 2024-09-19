import { elementHelpers as h } from "./elementHelpers.js";



// -----------------------------------------------------
//  Preformat 
// -----------------------------------------------------

export function preFormatElement(element){

    // Formats the element prior to use
    preFormatReplacePlaceHolders(element)
    preFormatMissingClasses(element)
    preFormatMissingParentThing(element)
    preFormatMissingThing(element)
    preFormatReplaceKrValue(element)
    preFormatInsertBody(element)

    for(let e of element.children){
        preFormatElement(e)
    }

    

}



function preFormatReplacePlaceHolders(element){
    // Replace references in {{ }} like {{ name }} or {{ item.name }} with properties


    // Get text nodes
    let textNodes = []
    for(let node of element.childNodes){

        if(node.nodeType == 3){
            textNodes.push(node)
        }
    }

    for(let node of textNodes){
    
        const content = node.nodeValue
        
        if(!content || content == null || content == ''){ return }
        
        const properties = content.match(/\{\{(.*?)\}\}/g);
    
        if(!properties || properties == null){ return }
    
        
        for(let p of properties){
    
           
            let word = p.replace('{{', '')
            word = word.replace('}}', '')
            word = word.trim()
    
            let path = word.split('.')
    
            let newContent = ''
    
            // Open property
            for(let p of path){
                newContent += `<span class="krProperty" data-propertyID="${p}">`
            }
    
            // Close properties
            for(let p of path){
                newContent = newContent + '</span>'
            }
    
            // Update element textContent
            node.nodeValue = content.replace(p, '')
    
            let temp = document.createElement('span')
            temp.innerHTML = newContent
    
            element.appendChild(temp)
            
        }
    }
    
    
}


function preFormatMissingClasses(element){

    // Converts elements with proper attributes to proper class 

    let record_type = element.getAttribute('data-record-type')
    let record_id = element.getAttribute('data-record-id')
    let propertyID = element.getAttribute('data-propertyID')
    let valueID = element.getAttribute('data-valueID')

    let record_type_null = !record_type || record_type == null || record_type == ''
    let record_id_null = !record_id || record_id == null || record_id == ''
    let record_propertyID_null = !propertyID || propertyID == null || propertyID == ''
    let record_valueID_null = !valueID || valueID == null || valueID == ''

    // Convert to krThing if type and id but not property
    if(record_type_null == false && record_id_null == false && record_propertyID_null == true){
        element.classList.add('krThing')
    }

    // Convert to krProperty if type and id but not property
    if(record_propertyID_null == false && record_valueID_null == true){
        element.classList.add('krProperty')
    }

    // Convert to krProperty if type and id but not property
    if(record_valueID_null == false){
        element.classList.add('krValue')
    }

}

function preFormatMissingParentThing(element){

    if(element.classList.contains('krProperty')){
        // If not krThing above, insert krThing
        let thingElement = h.getParent(element, 'krThing', 'krProperty')
        if(!thingElement || thingElement == null ){
            let parentElement = insertParentElement(element, 'krThing')
            parentElement.classList.add('kr-added-missing-parent-thing')
            parentElement.setAttribute('data-record-type', element.getAttribute('data-record-type'))
            parentElement.setAttribute('data-record-id', element.getAttribute('data-record-id'))
        }
    }

}

function preFormatMissingThing(element){

    if(element.classList.contains('krProperty')){
        // If property child of another property, insert krThing
        let childProperties = h.getChildrenAll(element, 'krProperty', 'krThing')
        for(let e of childProperties){
            insertParentElement(e, 'krThing')
        }
    }

}


function preFormatReplaceKrValue(element){

    if(element.classList.contains('krProperty')){

        // Remove krValue
        let childValues = h.getChildrenAll(element, 'krValue', 'krProperty')

        // Repalce child values
        for(let e of childValues){

            // get value body
            let valueBody = h.getChildren(e, 'krValueBody', 'krProperty')
            if(valueBody && valueBody != null){
                while(e.firstElementChild){
                    e.parentElement.appendChild(e.firstElementChild)
                }
                e.remove()

            } else {
                e.classList.add('krValueBody')
                e.classList.remove('krValue')
            }



        }
    }
}


function preFormatInsertBody(element){

    // Inserts a krXXXBody elementif missing one
    let elementType = h.getType(element)
    if(!elementType || elementType == null){ return }

    let elementNextType = h.getNextType(element)
    let bodyElement = h.getChildren(element, elementType + 'Body', elementNextType)

    if(!bodyElement || bodyElement == null){
        insertChildElement(element, elementType + 'Body')
    }

}


function insertParentElement(element, className){

    let temp = document.createElement('span')
    temp.classList.add(className)

    element.after(temp)
    temp.appendChild(element)

    return temp

}

function insertChildElement(element, className){
    // Inserts a child between current element and childrens
    let temp = document.createElement('span')
    temp.classList.add(className)

    while(element.firstElementChild){
        temp.appendChild(element.firstElementChild)
    }

    element.appendChild(temp)

    return temp

}
