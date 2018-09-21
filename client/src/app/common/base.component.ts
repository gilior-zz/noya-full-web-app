import {Router} from '@angular/router'
import {OnInit, Injector} from '@angular/core'
import * as services from '../services/services'
import { Title }     from '@angular/platform-browser';

export class BaseComponent implements OnInit {

    constructor(injector: Injector) {
        let titleService: Title = injector.get(Title);
        let routerService: Router = injector.get(Router);
        let translationService: services.TranslationService = injector.get(services.TranslationService);
        let url = routerService.routerState.snapshot.url.replace('/', '');

        let tranlatedItem = translationService.TranlateItem(url);
        titleService.setTitle(tranlatedItem);
        //$(".pageName").text(tranlatedItem);
    }
    ngOnInit() {

    }
}