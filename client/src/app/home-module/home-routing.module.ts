import { Home } from './home/home';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
const adminRoutes: Routes = [
  {
    path: '',
    component: Home,
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  declarations: [],
  exports:[RouterModule]
})
export class HomeRoutingModule { }
