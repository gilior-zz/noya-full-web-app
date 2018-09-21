import {Component} from '@angular/core';
import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';
import {Language} from '../../../../shared/models'
import {CacheManager} from '../services/services'


@Component({
  selector: 'lang-bar',
  templateUrl: './lang-bar.component.html',
  styleUrls: ['./lang-bar.component.scss'],
  animations: [
    trigger(
      'isLangBarOpenRTL', [
        state('1', style({transform: 'translateX(0)'})),
        state('0', style({transform: 'translateX(-52px)'})),
        transition('0=>1', [animate(300, keyframes([
          style({transform: 'translateX(-52px)', offset: 0}),
          style({transform: 'translateX(15px)', offset: 0.3}),
          style({transform: 'translateX(0)', offset: 1.0})
        ]))]),
        transition('1=>0', [animate(300, keyframes([
          style({transform: 'translateX(0)', offset: 0}),
          style({transform: 'translateX(15px)', offset: 0.7}),
          style({transform: 'translateX(-52px)', offset: 1.0})
        ]))
        ]),
      ]
    ),
    trigger(
      'isLangBarOpenLTR', [
        state('1', style({transform: 'translateX(0)'})),
        state('0', style({transform: 'translateX(89px)'})),
        transition('0=>1', [animate(300, keyframes([
          style({transform: 'translateX(89px)', offset: 0}),
          style({transform: 'translateX(-15px)', offset: 0.3}),
          style({transform: 'translateX(0)', offset: 1.0})
        ]))]),
        transition('1=>0', [animate(300, keyframes([
          style({transform: 'translateX(0)', offset: 0}),
          style({transform: 'translateX(-15px)', offset: 0.7}),
          style({transform: 'translateX(89px)', offset: 1.0})
        ]))
        ]),
      ]
    )


  ]
})

export class LangBarComponent {

  isLangBarOpen: boolean = false;
  public classes: {};

  constructor(public cacheManager: CacheManager) {


  }

  get isEng(): boolean {
    return this.cacheManager.GetFromCache('lang', Language.Hebrew) == Language.English;
  }

  get isHeb(): boolean {
    return !this.isEng;
  }

  toggleLangBarState() {

    this.isLangBarOpen = !this.isLangBarOpen;
  }

  toEng() {
    this.cacheManager.StoreInCache("lang", Language.English);
    document.location.reload();
  }

  //{'main-wrp--lang-wrp-ltr':isEng,'main-wrp--lang-wrp-rtl':isHeb}

  toHeb() {
    this.cacheManager.StoreInCache("lang", Language.Hebrew);
    document.location.reload();
  }

  setClasses() {
    this.classes =
      {
        'main-wrp--lang-wrp-ltr': this.isEng,
        'main-wrp--lang-wrp-rtl': this.isHeb,
      }
  }


  onChange(lang: string) {
    switch (lang) {
      case 'heb':
        this.toHeb();
        break;
      case 'eng':
        this.toEng();
        break;
    }
  }
}
