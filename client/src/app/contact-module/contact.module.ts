import {NgModule} from '@angular/core';

import {SharedModule} from '../common/shared.module';
import {ContactRoutingModule} from './contact-routing.module';
import {Contact} from './Contact/contact';
import {DynamicFormQuestionComponent} from './model/dynamic-form-question.component';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  imports: [
    SharedModule,
    ContactRoutingModule
  ],
  declarations: [Contact, DynamicFormQuestionComponent]
})
export class ContactModule {
}
