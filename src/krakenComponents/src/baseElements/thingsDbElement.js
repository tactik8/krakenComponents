
import { KrThing, KrCache } from "krakenthing";


const DEFAULT_APIURL = 'https://api.krknapi.com'
const DEFAULT_APIBASEPATH = '/api'
const DEFAULT_APICOLLECTION = 'testComponent'





export class ThingsDbElement {
    /**
     * On page database of things acting aslso as proxy for saving retrieving to API
     * 
     */

    construstor(element){
        this._db = new KrCache()
        this._element = element
    }


    initObject(){
        let element = document.createElement('span')
        element.classList.add('kr-db')
        element.id = String(crypto.randomUUID())
    }

    get element(){
        return this._element
    }

    get apiUrl(){
        return this.element.getAttribute('data-apiUrl') || DEFAULT_APIURL
    }

    get apiBasePath(){
        return this.element.getAttribute('data-apiBasePath') || DEFAULT_APIBASEPATH
    }

    get apiCollection(){
        return this.element.getAttribute('data-apiCollection') || DEFAULT_APICOLLECTION
    }
    

    async initElements(){

        let thingElements = this.element.querySelector('.krThing')

        for(let e of thingElements){

          let record_type = e.getAttribute('data-record-type')
          let record_id = e.getAttribute('data-record-id')

          let thing = await this.get(record_type, record_id)
            
        }
        
    }


    async get(record_type, record_id){

        // Get from local cache
        let thing = this._db.get(record_type, record_id)

        // If not in db, get from api
        if(!thing || thing == null){
            thing = await this._getFromApi(record_type, record_id)
        }

        // Else create
        if(!thing || thing == null){
            thing = new KrThing(record_type, record_id)
        }

        return thing
    }

    async _getFromApi(record_type, record_id){

        if(!thing.api.apiUrl || thing.api.apiUrl == null || thing.api.apiUrl == ''){
            return null
        }
        
        let thing = new KrThing(record_type, record_id)
        thing.api.apiUrl = this.apiUrl
        thing.api.apiBasePath = this.apiBasePath
        thing.api.apiCollection = this.apiCollection
        
        let r = await thing.api.get()

        if(r.p.actionStatus == 'ActionStatusCompleted'){
            this._db.set(thing)
            return thing
        }
        
        return null
        
    }

    async set(thing){
        
        this._db.set(thing)
        
    }

    async save(thing){

        if(!thing.api.apiUrl || thing.api.apiUrl == null || thing.api.apiUrl == ''){
            return false
        }

        thing.api.apiUrl = this.apiUrl 
        thing.api.apiBasePath = this.apiBasePath
        thing.api.apiCollection = this.apiCollection

        await thing.api.post()

        // Add ot local cache
        this._db.set(thing)
        
    }


    async saveAll(){

        let things = this._db.things

        for(let thing of things){
            await this.save(thing)
        }
    }
    
}


