import {HomeRoutingModule} from './home-routing.module';
import {SharedModule} from '../common/shared.module';
import {TraverseItemComponent} from './card/traverse-item.component';
import {CardsManagerComponent} from './cards/cards-manager.component';
import {NgModule} from '@angular/core';

import {Home} from './home/home'




@NgModule({
  imports: [
    SharedModule,
    HomeRoutingModule
  ],
  declarations: [TraverseItemComponent, CardsManagerComponent, Home],
  exports: []
})
export class HomeModule {
}
