


export function setEventReorder(BaseElement, DB){



    
    
    BaseElement.element.draggable=true


    BaseElement.element.addEventListener('dragstart', event => {

        event.dataTransfer.setData("text/plain", JSON.stringify(BaseElement.thing.record));
        event.target.classList.add('dragging')

    })

    BaseElement.element.addEventListener('dragend', event => {

        event.dataTransfer.setData("text/plain", JSON.stringify(BaseElement.thing.record));
        event.target.classList.add('dragging')

    })

    
    BaseElement.element.addEventListener('dragover', event => {

        event.preventDefault()
        event.stopPropagation()
        
        
    })

    BaseElement.element.addEventListener('drop', event => {

        event.preventDefault()
        event.stopPropagation()

        console.log('Reorder drop')

        let draggingElement = document.querySelector('.dragging')


        if(!draggingElement){ return }
        
        console.log(draggingElement)
        
        draggingElement.classList.remove('dragging')
        let draggingObject = DB.get(draggingElement)

        let dropzoneObject = DB.get(event.currentTarget)

        console.log(draggingObject.thing.ref)
        
        console.log(dropzoneObject.thing.ref)

        
        let item = event.currentTarget
        let itemList = null
        
        while(item){
            console.log(item.tagName)
            if(item.classList.contains('krThing')){
                let temp = DB.get(item)
                if(temp.record_type == 'ItemList'){
                    itemList = temp
                    break
                }
                
            }
            item = item.parentElement
        }

        if(itemList){
            console.log(itemList.thing.ref)
                itemList.thing.l.insertBefore(draggingObject.thing.ref, dropzoneObject.thing.ref)
        }
        
        
        BaseElement.redraw()
    })

    
}