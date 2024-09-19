

import { setEventDrag } from './eventDrag.js'
import { setEventDrop } from './eventDrop.js'
import { setEventReorder } from './eventReorder.js'




export function setEvents(BaseElement, DB){


    if(BaseElement.element.classList.contains('krDrag')){
        setEventDrag(BaseElement, DB)
        
    }

    if(BaseElement.element.classList.contains('krDrop')){
            setEventDrop(BaseElement, DB)

    }


    if(BaseElement.element.classList.contains('krReorder')){
        setEventReorder(BaseElement, DB)
    }

    
}