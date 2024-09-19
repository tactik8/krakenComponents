
import { KrComponent } from '../baseElements/KrComponent/KrComponent.js'


export class KrActionMenuItemComponent extends KrComponent {
  constructor() {
    super('krThing');

  }

  get htmlTemplate(){
    return `

        <li>
            <a class="dropdown-item">
                    
                    <span class="krProperty"data-propertyID="image"><kr-avatar></kr-avatar> </span>
                    <span class="krProperty" data-propertyID="name"></span>
            </a>
        </li>

    `
  }


  
}

customElements.define("kr-action-menu-item", KrActionMenuItemComponent);


