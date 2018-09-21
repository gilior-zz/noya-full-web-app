import {SharedModule} from '../common/shared.module';
import {NgModule} from '@angular/core';


import {BiographyRoutingModule} from './biography-routing.module';

import {BiographyComponent} from './biography/biography.component';
import {Biography} from './biographies/biography';

@NgModule({
  declarations: [BiographyComponent, Biography],
  imports: [
    SharedModule,
    BiographyRoutingModule
  ],


})
export class BiographyModule {
}
