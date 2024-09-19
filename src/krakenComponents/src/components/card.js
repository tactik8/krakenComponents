import { KrComponent } from '../baseElements/KrComponent/KrComponent.js'



export class KrCardComponent extends KrComponent {
  constructor() {
    super('krThing', 'card');
    
  }
}

customElements.define("kr-card", KrCardComponent);

