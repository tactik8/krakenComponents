import { KrComponent } from '../baseElements/KrComponent/KrComponent.js'



export class KrAvatarComponent extends KrComponent {
  constructor() {
    super('krThing', 'mediaAvatar');
    
  }
}

customElements.define("kr-avatar", KrAvatarComponent);

