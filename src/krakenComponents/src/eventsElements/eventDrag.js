


export function setEventDrag(BaseElement){


    BaseElement.element.draggable=true
    
    BaseElement.element.addEventListener('dragstart', event => {

        event.dataTransfer.setData("text/plain", JSON.stringify(BaseElement.thing.record));
        
    })

    
}