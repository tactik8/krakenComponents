import { KrComponent } from '../baseElements/KrComponent/KrComponent.js'



export class KrActionMenuComponent extends KrComponent {
  constructor() {
    super('krProperty');
      
      
  }

  get htmlTemplate(){
    return `

         <div class="dropdown">
        <a class="btn p-0" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"  fill="currentColor" class="bi bi-three-dots-vertical" >
                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
            </svg>

        </a>

        <ul class="dropdown-menu">

            
            <kr-action-menu-item>
            
            </kr-action-menu-item>

        
        </ul>
    </div>

    `
  }


  
}

customElements.define("kr-action-menu", KrActionMenuComponent);


