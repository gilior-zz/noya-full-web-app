import { Contact } from './Contact/contact';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from "../common/can-deactivate-guard.service";

const routes: Routes = [
  {path:'',component:Contact,canDeactivate:[CanDeactivateGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRoutingModule { }
