import {NgModule} from '@angular/core';
import {RouterModule, CanDeactivate} from '@angular/router';


import {HeaderImage} from '../HeaderImage/header.image';
import {CanDeactivateGuard} from '../common/can-deactivate-guard.service';


@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {path: 'home', loadChildren: '../home-module/home.module#HomeModule'},
        {path: 'biography', loadChildren: '../biography-module/biography.module#BiographyModule'},
        {path: 'contact', loadChildren: '../contact-module/contact.module#ContactModule'},
        {path: 'links', loadChildren: '../links-module/links.module#LinksModule'},
        {path: 'programs', loadChildren: '../programs-module/programs.module#ProgramsModule'},
        {path: 'videos', loadChildren: '../videos-module/videos.module#VideosModule'},
        {path: 'pictures', loadChildren: '../pictures-module/pictures.module#PicturesModule'},
        {path: '', redirectTo: 'home', pathMatch: 'full'}
      ]
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [
    CanDeactivateGuard
  ]
})
export class AppRoutingModule {
}






