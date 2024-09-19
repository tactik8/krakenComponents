import { KrComponent } from '../baseElements/KrComponent/KrComponent.js'


export class KrListComponent extends KrComponent {
  constructor() {
    super('krThing', null);

  }

  get htmlTemplate(){
    return `

        <h1> Tes223</h1>

        <div class="krProperty" data-propertyID="name">
          <h1><span class="krValue"></span></h1>
        </div>

        <div class="krProperty krDrop" data-propertyID="itemListElement">
          <kr-list-item class="krReorder"></kr-list-item>
        </div>    

    `
  }
  
}

customElements.define("kr-list", KrListComponent);

