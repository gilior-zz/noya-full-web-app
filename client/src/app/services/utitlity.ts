import { Injectable } from '@angular/core'
import { Language } from '../../../../shared/models'
import { CacheManager } from './services'
@Injectable()
export class UtiltyService {
    constructor(public cacheManager: CacheManager) { }
    get IsHebrewMode(): boolean { return this.cacheManager.GetFromCache('lang', 0) == Language.Hebrew; }

    get IsMobile(): boolean { return window.innerWidth <= 767; }
    get IsPhablet(): boolean { return window.innerWidth > 767 && window.innerWidth <= 991; }
    get IsTablet(): boolean { return window.innerWidth > 991 && window.innerWidth <= 1199 }
    get IsDesktop(): boolean { return window.innerWidth > 1199 }



}





