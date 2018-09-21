﻿import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core'
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router'
import {PageNameService} from '../services/page-name.service'
import {UtiltyService} from '../services/utitlity';

@Component({
  selector: 'header-image',
  templateUrl: './header.image.html',

  styleUrls: ['./header.image.scss']


})

export class HeaderImage implements OnInit, AfterViewInit {
  public show = false;
  @ViewChild('headerRow') headerRow: HTMLDivElement;
  //ImageURL: string;
  active: boolean = true;
  ImageURL: string;
  mainImage: string = 'https://res.cloudinary.com/lior/image/upload/v1468953847/home_pic.jpg';
  safeMainImage = this.sanitizer.bypassSecurityTrustStyle(`url('${this.mainImage}')`);
  kidsImage: string = 'https://res.cloudinary.com/lior/image/upload/v1478964869/galilu-home-image.png';
  safeKidsImage = this.sanitizer.bypassSecurityTrustStyle(`url('${this.kidsImage}')`);
  @Input() pageName: string;
  currentStyles: {};



  //ImageURL: SafeUrl;
  constructor(private pn: PageNameService,
              public sanitizer: DomSanitizer,
              public router: Router,
              public utiltyService: UtiltyService) {

  }

  get Title(): string {
    return this.pn.currentUrl.includes('galilu') ? 'Galilu' : 'Noya Schleien';
  }

  get Subject(): string {
    return this.pn.currentUrl.includes('galilu') ? 'Custom designed products for toddlers' : 'Marimba & Percussion';
  }

  get safeImage(): SafeStyle {
    return this.pn.currentUrl.includes('galilu') ? this.safeKidsImage : this.safeMainImage;
  }

  ngAfterViewInit(): void {
    console.log(this.headerRow)
    setTimeout(() => {
      if (this.utiltyService.IsMobile)
        this.setCurrentStyles(false)
    }, 0)

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //this.active = false;
    //setTimeout(this.active = true, 0);
    return true;
  }

  ngOnInit() {
    //this.logService.writeToLog('in ngOnInit');

    //var req: dal.MenuImageRequest = { Language: dal.Language.Hebrew, PathName: this.pageName };

    //this.dataService.GetData(req, 'api/Data/GetImageForMenuItem').subscribe(
    //    (res: dal.MenuImageResponse) => {
    //        this.ImageURL = res.ImageURL; //console.log(this.ImageURL) }
    //        this.safeImage = this.sanitizer.bypassSecurityTrustStyle(`url('${this.ImageURL}')`);

    //    })
  }


  setCurrentStyles(show) {
    // CSS styles: set per current state of component properties
    this.currentStyles = {
      'height.px': show && this.utiltyService.IsMobile ? 550 : 200,

    };
  }


}
