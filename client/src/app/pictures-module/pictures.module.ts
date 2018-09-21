import {SharedModule} from '../common/shared.module';
import {NgModule} from '@angular/core';


import {PicturesRoutingModule} from './pictures-routing.module';
import {Pictures} from './pictures/pictures';
import {PictureComponent} from './picture/picture.component';
import {PictureCarouselComponent} from './picture-carousel/picture-carousel.component';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    SharedModule,
    PicturesRoutingModule
  ],
  declarations: [Pictures, PictureComponent, PictureCarouselComponent]
})
export class PicturesModule {
}
