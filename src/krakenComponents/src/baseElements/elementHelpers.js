import { krakenHtml } from "krakenhtml";



export const elementHelpers = {
    getParent: getParentElement,
    getParentTop: getParentElementTop,
    getChildren: getChildrenElement,
    getChildrenAll: getChildrenElementAll,
    getType: getElementType,
    getNextType: getElementNextType,
    redrawTemplate: redrawFromTemplate,
    redrawTemplateId: redrawFromTemplateID,
    redrawValue: redrawValue,
    removeChildren: removeChildren
};




function getElementType(element) {
    if (element.classList.contains("krThing")) {
        return "krThing";
    }
    if (element.classList.contains("krProperty")) {
        return "krProperty";
    }
    if (element.classList.contains("krValue")) {
        return "krValue";
    }
    return null;
}

function getElementNextType(element) {
    // Returns next type in hierarchy
    let elementType = getElementType(element);
    switch (elementType) {
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

function getParentElement(element, className) {
    if(!element || element == null){ return undefined }
    return element.closest("." + className) || undefined;
}

function getParentElementTop(element, className) {
    let topParent = undefined;
    let item = element;
    while (item) {
        if (item.classList.includes(className)) {
            topParent = item;
        }
        item = item.parentElement;
    }
    return topParent;
}

function getChildrenElement(
    element,
    classToGet,
    classToStop,
    attributeID1,
    attributeValue1,
    attributeID2,
    attributeValue2,
) {
    // Get a specific children element
    let childrenElements = getChildrenElementAll(
        element,
        classToGet,
        classToStop,
    );
    for (let e of childrenElements) {
        if (attributeID1 && attributeID1 != null) {
            let pv1 = e.getAttribute(attributeID1);
            if (pv1 != attributeValue1) {
                continue;
            }
        }

        if (attributeID2 && attributeID2 != null) {
            let pv2 = e.getAttribute(attributeID2);
            if (pv2 != attributeValue2) {
                continue;
            }
        }

        return e;
    }

    return undefined;
}

function getChildrenElementAll(
    element,
    classToGet,
    classToStop,
    attributeID1,
    attributeValue1,
    attributeID2,
    attributeValue2,
) {
    // Get a specific children element

    let results = [];
    let childrenElements = _getAllChildren(element, classToGet, classToStop);
    for (let e of childrenElements) {
        if (attributeID1 && attributeID1 != null) {
            let pv1 = e.getAttribute(attributeID1);
            if (pv1 != attributeValue1) {
                continue;
            }
        }

        if (attributeID2 && attributeID2 != null) {
            let pv2 = e.getAttribute(attributeID2);
            if (pv2 != attributeValue2) {
                continue;
            }
        }

        results.push(e);
    }

    return results;
}

function _getAllChildren(element, classToGet, classToStop) {

    let results = [];
    
    for (let e of element.children) {

        if(e.classList.contains(classToStop)){
            continue
        }
        
        if(e.classList.contains(classToGet)){
            results.push(e)
        }
        
        let v = _getAllChildren(e, classToGet, classToStop);
        if (v.length > 0) {
            results = results.concat(v);
        }
        
    }
    
    
    return results;
}

function removeChildren(
    element,
    classToGet,
    classToStop,
    attributeID,
    attributeValues,
) {
    // Remove children that is not in the list of attribute Values

    if (!Array.isArray(attributeValues)) {
        attributeValues = [attributeValues];
    }

    let childrens = _getAllChildren(element, classToGet, classToStop);
    for (let e of childrens) {
        let propertyValue = e.getAttribute(attributeID);
        if (!attributeValues.includes(propertyValue)) {
            e.remove();
        }
    }
}

// -----------------------------------------------------
//  Redraw
// -----------------------------------------------------

function redrawValue(element, record_type, key, value, options) {
    
    element.innerHTML = krakenHtml.base.value(value, record_type, key, options);
}


function replaceRecordIds(element){

    element.id = String(crypto.randomUUID())
    for(let e of element.children){
        replaceRecordIds(e)
    }
    
}

function redrawFromTemplate(element, template) {
    let temp = document.createElement('div')
    temp.innerHTML = template;
    //replaceRecordIds(temp)
    element.innerHTML= ''
    while(temp.firstElementChild){
        element.appendChild(temp.firstElementChild)
    }
    
    
    return;
}

function redrawFromTemplateID(element, templateID, value, options) {
    
    try {
        element.innerHTML = krakenHtml.form?.[templateID](value, options);
    } catch (error){
    
    
    try {
        element.innerHTML = krakenHtml.components[templateID](value, options);
    } catch (error) {
        try {
            element.innerHTML = krakenHtml.blocks[templateID](value, options);
        } catch (error){

            try {
                element.innerHTML = krakenHtml.base[templateID](value, options);
            } catch (error){
                
            }
            
        }
    }
    }

    
    return;
}
