import {AfterViewInit, Component, ElementRef, Injector, OnInit} from "@angular/core"

import * as services from "../services/services"
import * as dal from "../dal/models"
import * as $ from 'jquery';

import {Router} from '@angular/router'
import {BaseComponent} from '../common/base.component'
import {PageNameService} from '../services/page-name.service'
import {Observable} from "rxjs";
import {select} from "@angular-redux/store";
import {MSG_SNT} from "../../store/const";
import {Actions} from "../../store/actions/actions";


@Component({
  selector: "ny-root",
  templateUrl: "./app.component.html",
  styleUrls: ['./app.component.scss'],

})


export class AppComponent extends BaseComponent implements OnInit, AfterViewInit {
  @select('msg_snt') msg_snt$: Observable<{}>;
  currentPathName: string;
  menuItems: dal.MenuItem[];
  currentView: string;
  headerImage: string;

  constructor(private elementRef: ElementRef, private dataService: services.DataService, private cacheManager: services.CacheManager, private router: Router, private injector: Injector, private pn: PageNameService, private yts: services.youTubeService, public  homeAPIActions: Actions) {
    super(injector);

  }

  get pageName(): string {
    return this.pn.currentPageName;
  }

  get dir(): string {
    let l = this.cacheManager.GetFromCache('lang', dal.Language.Hebrew);
    if (l == dal.Language.Hebrew) return 'rtl'
    else return 'ltr'
  }

  get oppositeDir():string{
    let l = this.cacheManager.GetFromCache('lang', dal.Language.Hebrew);
    if (l == dal.Language.Hebrew) return 'ltr';
    else return 'rtl';
  }

  get isHebrew(): boolean {
    let l = this.cacheManager.GetFromCache('lang', dal.Language.Hebrew) == dal.Language.Hebrew;
    return l;
  }

  get galiluMessage(): string {

    return this.pn.currentUrl.includes('galilu') ? 'Noya Schleien' : 'To store'
  }

  get displayMenu(): boolean {
    //console.log('in displayMenu');
    return !this.pn.currentUrl.includes('galilu')
  }

  onDismiss() {
    this.goToHomePage();
  }

  public UpdateImage(imageUrl: string) {

  }

  goToContact() {
    this.router.navigate(['/contact']);
  }

  goToContent(): void {
    const div = (this.elementRef.nativeElement as Element).querySelector('#content') as HTMLDivElement;

    div.style.top;
    //console.log(div.scrollTop);
    $('html, body').animate({
      scrollTop: top
    }, 1000);
    //console.log(div.scrollTop);
  };

  //@HostListener('mouseenter') onMouseEnter() {
  //    this.kidsArtMessage = 'Coming Soon...';
  //}

  //@HostListener('mouseleave') onMouseLeave() {
  //    this.kidsArtMessage = 'Kids Art';
  //}

  changeMode() {
    if (this.pn.currentUrl.includes('galilu'))
      this.router.navigate(['/home']);
    else
      this.router.navigate(['galilu']);
  }

  changeToEnglish() {
    this.cacheManager.StoreInCache("lang", dal.Language.English);
    document.location.reload();
  }

  changeToHebrew() {
    this.cacheManager.StoreInCache("lang", dal.Language.Hebrew);
    document.location.reload();
  }

  ngAfterViewInit() {

  }

  goToHomePage() {
    this.homeAPIActions.doAction({actiontype: MSG_SNT}, false)
    this.router.navigate(['/'])
  }


  ngOnInit() {
    // if (environment.production) {
    //   if (location.protocol === 'http:') {
    //     window.location.href = location.href.replace('http', 'https');
    //   }
    // }
    // this.msg_snt$.subscribe((msg_snt) => {
    //   if (msg_snt)
    //     setTimeout(() => {
    //       this.homeAPIActions.doAction({actiontype: MSG_SNT}, [false])
    //       this.router.navigate(['/'])
    //     }, 2000)
    //
    // })

  }


}

