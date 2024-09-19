import { KrComponent } from '../baseElements/KrComponent/KrComponent.js'


export class KrPillComponent extends KrComponent {
  constructor() {
    super();
    this._thing = null

    this.templateID = 'pill'

  }
}

customElements.define("kr-pill", KrPillComponent);

