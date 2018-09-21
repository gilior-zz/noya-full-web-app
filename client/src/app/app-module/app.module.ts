import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../../environments/environment';







import {NgModule} from '@angular/core'


import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app.routes'


import {SharedModule} from '../common/shared.module'


import {HeaderImage} from '../HeaderImage/header.image'
import {MenuComponent} from '../Menu/menu'
import {LangBarComponent} from '../LangBar/lang-bar.component'
import {NavigationEnd, Router} from '@angular/router';
import {GoogleAnalyticsService} from '../services/google-analytics';
import {CoreModule} from '../common/core.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {StoreModule} from '../../store/store.module';
import {ContactWidget} from "../contact-widget/contact-widget";
import {ReactiveFormsModule} from "@angular/forms";
//import {GaliluModule} from './galilu/galilu-module'


declare var ga;

@NgModule({
  declarations: [AppComponent, HeaderImage, MenuComponent, LangBarComponent,ContactWidget],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    CoreModule,
    StoreModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production})
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(public router: Router, public googleAnalyticsEventsService: GoogleAnalyticsService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        ga('set', 'page', event.urlAfterRedirects);
        ga('send', 'pageview');
      }
    });
    const org = console.log;
    console.log = function (message?: any, ...optionalParams: any[]) {
      if (environment.production) return
      org.apply(console, arguments)
    }
  }
}
