
import { KrThing, KrCache } from "krakenthing";
import { KrGlobalElementDb } from '../KrGlobalElementDB/KrGlobalElementDb.js'


const DEFAULT_APIURL = 'https://data.krknapi.com'
const DEFAULT_APIBASEPATH = '/api'
const DEFAULT_APICOLLECTION = 'testComponent'





export class KrThingDb {
    /**
     * On page database of things acting aslso as proxy for saving retrieving to API
     * 
     */

    constructor(element){
        this._thingDb = new KrCache()
        this.callbacks = {}
        this.elementDb = new KrGlobalElementDb()
        this.element = element
        
    }


    initObject(){
        console.log('KrthingDb init')
        let element = document.createElement('span')
        element.classList.add('kr-db')
        element.id = String(crypto.randomUUID())
        this.elementDb.set(this.element, 'KrThingDb', this)

        // Activate element under 
        for(let e of this.element.querySelectorAll('.krThing')){
            let KrElement = this.elementDb.get(e, 'KrElementClass')
            if(KrElement && KrElement != null){

                KrElement.addEventListener(KrElement, KrElement.record_type, KrElement.record_id)
                this.get(KrElement.record_type, KrElement.record_id)
              
            }
        }
        
    }

    get element(){
        return this._element
    }

    set element(value){
        
        this._element = value
        this._element.classList.add('kr-db')
        this.initObject()
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

        console.log('Get')
        // Get from local cache
        let thing = this._thingDb.get(record_type, record_id)

        // If not in db, get from api
        if(!thing || thing == null){
            console.log('Get from api')
            this._getFromApi(record_type, record_id)
        }

        // Else create
        if(!thing || thing == null){
            thing = new KrThing(record_type, record_id)
        }

        return thing
    }

    async _getFromApi(record_type, record_id){


        if(record_type === undefined || record_type == null || record_type == 'undefined'){ return }
        if(!record_id || record_id == null || record_id == 'undefined'){ return }
        
        if(!this.apiUrl || this.apiUrl == null || this.apiUrl == ''){
            return null
        }

        let thing = new KrThing(record_type, record_id)
        thing.api.apiUrl = this.apiUrl
        thing.api.apiBasePath = this.apiBasePath
        thing.api.apiCollection = this.apiCollection

        let r = await thing.api.get()

        console.log('rr', r.p.actionStatus)
        if(r.p.actionStatus == 'CompletedActionStatus'){
            this.set(thing)
            return thing
        }

        return null

    }

    set(thing){

        console.log('Set thing')
        if(!thing || thing == null || !thing.record_type) { return }

        let previousThing = this._thingDb.get(thing.record_type, thing.record_id)

        

        
        this._thingDb.set(thing)

        // Run callbacks if changed
        if(!previousThing || previousThing == null || JSON.stringify(previousThing.record) != JSON.stringify(thing.record)){
            console.log('Run callback')
            this.runCallbacks(thing)
        } else {
            console.log('Things equal')
        }
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
        this._thingDb.set(thing)

    }


    async saveAll(){

        let things = this._thingDb.things

        for(let thing of things){
            await this.save(thing)
        }
    }


    runCallbacks(thing){

        console.log('KrthingDb runCallbacks')
        let KrElements = this.callbacks?.[thing.record_type]?.[thing.record_id]

        for(let k of KrElements){
            k.thing = thing
        }

        
    }

    addEventListener(KrElement, record_type, record_id){

        console.log('KrthingDb addEventListener')


        if(!record_type || record_type == null){ return }
        if(!record_id || record_id == null){ return }

        
        if(!this.callbacks?.[record_type]){
            this.callbacks[record_type] = {}
        }
        if(!this.callbacks[record_type]?.[record_id]){
            this.callbacks[record_type][record_id] = []
        }

        // Check if already in list
        for(let e of this.callbacks[record_type][record_id]){
            if(KrElement === e){ return }
        }

        // Add to list
        this.callbacks[record_type][record_id].push(KrElement)
        
    }

}


