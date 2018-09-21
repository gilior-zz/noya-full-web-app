import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GoogleAnalyticsService} from '../services/google-analytics';
import {UtiltyService} from '../services/utitlity';
import {PageNameService} from '../services/page-name.service';
import * as services from '../services/services';
import {Title} from '@angular/platform-browser';

import {Actions} from "../../store/actions/actions";

import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {CachingInterceptor} from "../services/noop-interceptor.service";

import {LocalStorageCache} from "../services/local-storage-cache";

@NgModule({

  providers: [PageNameService, services.CacheManager, services.DataService, services.DialogService, services.LogService, services.TranslationService, Title, services.youTubeService, UtiltyService, GoogleAnalyticsService,Actions,LocalStorageCache,{
    provide: HTTP_INTERCEPTORS,
    useClass: CachingInterceptor,
    multi: true,
  }]
})
export class CoreModule {
}
