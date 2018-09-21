﻿import {Component, EventEmitter, Output} from '@angular/core'
import {CacheManager} from "../services/services"
import * as dal from "../dal/models"

import {Router} from '@angular/router'
import {PageNameService} from '../services/page-name.service'

@Component({selector: 'main-menu', templateUrl: './menu.html', styleUrls: ['./menu.scss']})

export class MenuComponent {
  @Output() onHide: EventEmitter<boolean> = new EventEmitter();
  currentPathName: string;
  menuItems: dal.MenuItem[];
  currentView: string;
  headerImage: string;
  isCollapsed: boolean = false;

  constructor(private cacheManager: CacheManager,
              private router: Router,
              private pn: PageNameService) {


  }

  get pageName(): string {
    return this.pn.currentPageName;
  }

  get dir(): string {
    let l = this.cacheManager.GetFromCache('lang', dal.Language.Hebrew);
    if (l == dal.Language.Hebrew) return 'rtl'
    else return 'ltr'
  }

  get isHebrew(): boolean {
    let l = this.cacheManager.GetFromCache('lang', dal.Language.Hebrew) == dal.Language.Hebrew;
    return l;
  }

  get galiluMessage(): string {

    return this.pn.currentUrl.includes('galilu') ? 'Noya Schleien' : 'To store'
  }

  public changeCollpse() {
    this.isCollapsed = !this.isCollapsed;
    this.onHide.emit(this.isCollapsed);
  }

  public UpdateImage(imageUrl: string) {

  }

  goToContact() {
    this.router.navigate(['/contact']);
  }

  changeMode() {

    if (this.pn.currentUrl.includes('galilu'))
      this.router.navigate(['/home']);
    else
      this.router.navigate(['galilu']);
  }

  //@HostListener('mouseenter') onMouseEnter() {
  //    this.kidsArtMessage = 'Coming Soon...';
  //}

  //@HostListener('mouseleave') onMouseLeave() {
  //    this.kidsArtMessage = 'Kids Art';
  //}

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


}
