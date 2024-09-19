
import { KrElementClass} from './src/baseElements/KrElementClass/KrElementClass.js'
import { KrThingComponent } from './src/components/thing.js'
import { KrThingDbComponent } from './src/components/thingsDb.js'

import { KrPropertyComponent } from './src/components/property.js'
import { KrValueComponent } from './src/components/value.js'

import { KrRecordComponent} from './src/components/record.js'

import { KrCardComponent} from './src/components/card.js'

import { KrListComponent} from './src/components/list.js'
import { KrListItemComponent} from './src/components/listItem.js'

import { KrActionMenuItemComponent} from './src/components/actionMenuItem.js'
import { KrActionMenuComponent} from './src/components/actionMenu.js'

import { KrAvatarComponent} from './src/components/avatar.js'


export const krakenComponents = {

    thing: KrThingComponent,
    thingDb: KrThingDbComponent,
    property: KrPropertyComponent,
    value: KrValueComponent,
    record: KrRecordComponent,
    card: KrCardComponent,
    base: KrElementClass,
    list: KrListComponent,
    listItem: KrListItemComponent,
    actionMenuItem: KrActionMenuItemComponent,
    actionMenu: KrActionMenuComponent,
    avatar: KrAvatarComponent
}