import { KrComponent } from '../baseElements/KrComponent/KrComponent.js'


export class KrValueComponent extends KrComponent {
  constructor() {
    super('krValue');
    this.classList.add('krValue')

  

  }


}

customElements.define("kr-value", KrValueComponent);

