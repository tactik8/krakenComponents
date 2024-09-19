


const GLOBAL_DB = {}


export class KrGlobalElementDb {
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
     */
    
    constructor(){
        this._db = GLOBAL_DB
    }


    getElements(){

        let elements = []
        for(let elementId of Object.keys(this._db)){

            let element = this.getElement(elementId)
            if(element && element != null){
                elements.push(element)
            }
        }
        return elements
        
    }

    getElement(elementId){
        return this._getObjectById(elementId, '_element')
    }

    getObject(element, category){
        return this.get(element, category)
    }

    get(value, category){
        if(!value || value == null || value )

        if(Array.isArray(value)){
            let results = []
            for(let v of value){
                results.push(this.get(v, category))
            }
            return results
        }

            
        if(value instanceof Element || value instanceof Document ){
            return this._getObjectByElement(value, category)
        } else {
            return this._getObjectById(value, category)
        }
    }


    getObjects(category){

        let elements = []
        for(let elementId of Object.keys(this._db)){

            let element = this.get(elementId, category)
            if(element && element != null){
                elements.push(element)
            }
        }
        return elements
        
    }

    _getObjectById(elementId, category){

        if(!elementId || elementId== null || elementId == ''){ return null }
        
        let record = this._db?.[elementId]
        let object = record?.[category]

        return object
    }

    
    _getObjectByElement(element, category){

        if(!element || element == null || element == ''){ return null }

        let elementId = element.id
        return this._getObjectById(elementId, category)
        
    }

    

    set(value, category, object){

        if(!value || value == null || value == ''){ return false }

        
        if(value instanceof Element || value instanceof Document ){
            this._setObjectByElement(value, category, object)
        } else {
            this._setObjectById(value, category, object)
        }
    }


    setElement(element){
        // Set id
        let elementId = element.id
        if(!elementId || elementId == null || elementId == ''){
            element.id = String(crypto.randomUUID())
            elementId = element.id
        }

        this._setObjectById(elementId, '_element', element)
        
    }

    
    
    _setObjectByElement(element, category, object){

        if(!element || element == null || element == ''){ return false }

        if(!category || category == null){ this.setElement(value)}

        
        // Set id
        let elementId = element.id
        if(!elementId || elementId == null || elementId == ''){
            element.id = String(crypto.randomUUID())
            elementId = element.id
        }


        // Set element
        this.setElement(element, element)

        
        // Set object
        return this._setObjectById(elementId, category, object)
        
    }

    _setObjectById(elementId, category, object){
        
        // Set id
        if(!elementId || elementId== null || elementId == ''){ return false }
        
        let record = this._db?.[elementId]

        if(!record || record == null){
            record = {}
            this._db[elementId] = record
        }

        // Store object
        record[category] = object

    }
    
}


