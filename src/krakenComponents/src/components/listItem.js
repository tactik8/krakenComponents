import { KrComponent } from '../baseElements/KrComponent/KrComponent.js'



export class KrListItemComponent extends KrComponent {
  constructor() {
    super('krThing', null);
    

   
  }

  get htmlTemplate(){
    return `

        <div class="row m-2">
              <div class="col krProperty" data-propertyID="position">

              </div>

              <div class="col krProperty" data-propertyID="item">
                <kr-card></kr-card>
              </div>
        </div>

    `
  }

}

customElements.define("kr-list-item", KrListItemComponent);

