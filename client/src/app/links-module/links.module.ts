import {SharedModule} from '../common/shared.module';
import {NgModule} from '@angular/core';


import {LinksRoutingModule} from './links-routing.module';
import {Links} from './Links/links';
import {LinkComponent} from './link/link.component';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [

    SharedModule,
    LinksRoutingModule
  ],
  declarations: [Links, LinkComponent]
})
export class LinksModule {
}
