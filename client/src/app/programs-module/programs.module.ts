import {SharedModule} from '../common/shared.module';
import {NgModule} from '@angular/core';

import {ProgramsRoutingModule} from './programs-routing.module';
import {Programs} from './programs/programs';
import {ProgramComponent} from './program/program.component';


@NgModule({
  imports: [
    SharedModule,
    ProgramsRoutingModule
  ],
  declarations: [Programs, ProgramComponent]
})
export class ProgramsModule {
}
