import {PPipe} from '../pipes/pipes.pipe';
import {SafeResourcePipe} from '../pipes/safe.pipe';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';
import { DialogComponent } from './dialog.component';


@NgModule({
  imports: [CommonModule],
  declarations: [PPipe, SafeResourcePipe, DialogComponent],
  exports: [FormsModule, PPipe, SafeResourcePipe, ReactiveFormsModule, HttpClientModule,CommonModule, DialogComponent]
})
export class SharedModule {
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
