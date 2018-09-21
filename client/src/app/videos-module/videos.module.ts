import { SharedModule } from '../common/shared.module';
import { NgModule } from '@angular/core';


import { VideosRoutingModule } from './videos-routing.module';
import { Videos } from "./Videos/videos";
import {VideoComponent} from './video/video.component';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    SharedModule,
    VideosRoutingModule
  ],
  declarations: [Videos,VideoComponent]
})
export class VideosModule { }
