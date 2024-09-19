

import { KrComponent } from '../baseElements/KrComponent/KrComponent.js'

export class KrThingComponent extends KrComponent {
  constructor() {
    super('krThing', 'generic');


  }




}

customElements.define("kr-thing-item", KrThingComponent);


