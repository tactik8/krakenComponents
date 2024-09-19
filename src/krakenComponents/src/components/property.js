import { KrComponent } from '../baseElements/KrComponent/KrComponent.js'


export class KrPropertyComponent extends KrComponent {
  constructor() {
    super('krProperty');
    this.classList.add('krProperty')

  

  }



  
}

customElements.define("kr-property", KrPropertyComponent);

