


export function setEventDrop(BaseElement){


    console.log('test')
    
    BaseElement.element.addEventListener('dragover', event => {

        event.preventDefault()
        event.stopPropagation()
        
        
        
    })

    BaseElement.element.addEventListener('drop', event => {

        event.preventDefault()
        event.stopPropagation()

        console.log('drop')

        if(BaseElement.propertyID == 'itemListElement'){
            BaseElement.thing.l.add(JSON.parse(event.dataTransfer.getData("text/plain")))
        } else {
            BaseElement.thing.p.add(BaseElement.propertyID, JSON.parse(event.dataTransfer.getData("text/plain")))
        }
        BaseElement.redraw()
    })

    
}