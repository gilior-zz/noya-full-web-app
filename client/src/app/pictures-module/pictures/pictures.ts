import {
  Component,
  OnInit,
  AfterViewInit,
  Output,
  EventEmitter,
  OnDestroy,
  Injector,
  ViewChild,
  ElementRef, ChangeDetectionStrategy
} from '@angular/core'
import * as dal from '../../../../../shared/models'
import * as services from '../../services/services'

import {DomSanitizer, SafeUrl, SafeResourceUrl, SafeScript, SafeStyle} from '@angular/platform-browser';
import {BaseComponent} from '../../common/base.component'
import {Router} from '@angular/router'
import {select} from "@angular-redux/store";
import {Observable} from "rxjs";
import {Actions} from "../../../store/actions/actions";
import {LOAD_IMGs} from "../../../store/const";

declare var Swiper: any;

@Component({

  templateUrl: './pictures.html',

  styleUrls: ['./pictures.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})

export class Pictures extends BaseComponent implements OnInit, AfterViewInit, OnDestroy {

  mainImagePath: SafeStyle;
  @select('images') imgs$: Observable<dal.ImageGalleryItem[]>;
  imagesToolBarPathes: string[];
  isHebrew: boolean = false;
  isEnglish: boolean = false;
  HTMLDivElement: HTMLDivElement
  example1SwipeOptions: any;
  selectedID: number;
  @ViewChild('myModal') modal: ElementRef;
  @Output() headImageUpdate = new EventEmitter<string>();

  constructor(public sanitizer: DomSanitizer, private dataService: services.DataService, private cacheManager: services.CacheManager, public router: Router, private injector: Injector, public actions: Actions) {
    super(injector);
    this.mainImagePath = this.mainImagePath = this.sanitizer.bypassSecurityTrustStyle(`Content/Sources/loading.gif`);
    ;

    this.example1SwipeOptions = {
      slidesPerView: 4,
      loop: false,
      spaceBetween: 5
    };
  }

  ngOnDestroy() {

  }

  ngAfterViewInit() {


  }

  setClasses(imgId: number) {
    let classes = {
      item: true,
      active: imgId == this.selectedID
    };
    return classes;
  }

  onLeft() {

    this.LoadRequestedImage(dal.NextData.Prev);
  }

  // onSelectedImage(img: dal.ImageGalleryItem) {
  //   var currentImageID = img.ID;
  //   this.cacheManager.StoreInCache('currentImageID', currentImageID);
  //   this.LoadRequestedImage(dal.NextData.Currnet);
  // }

  onKeyUp(event: KeyboardEvent) {

    var nextData: dal.NextData = event.keyCode == 39 ? dal.NextData.Next : dal.NextData.Prev;
    this.LoadRequestedImage(nextData);
  }

  LoadRequestedImage(nextData: dal.NextData) {

    // var currentImageID = this.cacheManager.GetFromCache('currentImageID', 1);
    //
    // for (var i = 0; i < this.images.length; i++) {
    //   if (this.images[i].ID == currentImageID) {
    //     var currentIndex = i;
    //     var nextIndex = i + 1;
    //     var prevIndex = i - 1;
    //     var isLastImage = nextIndex == this.images.length;
    //     var isFirstImage = prevIndex == -1;
    //     break;
    //   }
    // }
    // switch (nextData) {
    //
    //   case dal.NextData.Next:
    //
    //     if (isLastImage) {
    //       this.mainImagePath = this.sanitizer.bypassSecurityTrustStyle(`url('${this.images[0].ImageURL}')`);
    //       this.cacheManager.StoreInCache('currentImageID', this.images[0].ID);
    //
    //     }
    //     else {
    //       this.mainImagePath = this.sanitizer.bypassSecurityTrustStyle(`url('${this.images[nextIndex].ImageURL}')`);
    //
    //       this.cacheManager.StoreInCache('currentImageID', this.images[nextIndex].ID);
    //
    //     }
    //
    //
    //     break;
    //   case dal.NextData.Prev:
    //     if (isFirstImage) {
    //       this.mainImagePath = this.sanitizer.bypassSecurityTrustStyle(`url('${this.images[this.images.length - 1].ImageURL}')`);
    //
    //       this.cacheManager.StoreInCache('currentImageID', this.images[this.images.length - 1].ID);
    //     }
    //     else {
    //       this.mainImagePath = this.sanitizer.bypassSecurityTrustStyle(`url('${this.images[prevIndex].ImageURL}')`);
    //
    //       this.cacheManager.StoreInCache('currentImageID', this.images[prevIndex].ID);
    //     }
    //
    //     break;
    //   case dal.NextData.Currnet:
    //     this.mainImagePath = this.sanitizer.bypassSecurityTrustStyle(`url('${this.images[currentIndex].ImageURL}')`);
    //
    //     this.cacheManager.StoreInCache('currentImageID', this.images[currentIndex].ID);
    //     break;
    // }


  }

  onRight() {
    this.LoadRequestedImage(dal.NextData.Next);
  }

  isSelected(img: dal.ImageGalleryItem): boolean {
    return this.cacheManager.GetFromCache('currentImageID', -1) == img.ID;
  }

  onImageSedlected($event) {
    //  this.modal['nativeElement']['modal']('show');
    this.selectedID = $event;
    if (window.innerWidth < 992) return;
    const id = '#' + this.modal.nativeElement.id;
    $(id)['modal']();
  }

  ngOnInit() {
    this.actions.dispatcAction({actiontype: LOAD_IMGs, url: 'GetImages'})
    // this.headImageUpdate.emit('aaaaa');
    // var lang = this.cacheManager.GetFromCache('lang', dal.Language.Hebrew);
    // this.isEnglish = lang == dal.Language.English;
    // this.isHebrew = lang == dal.Language.Hebrew;
    // var currentImageID = this.cacheManager.GetFromCache('currentImageID', 1);
    //
    // var req: dal.ImageGalleryRequest = {
    //   CurrentImageID: currentImageID,
    //   Language: dal.Language.Hebrew,
    //   NextData: dal.NextData.Currnet,
    //   DataAmount: dal.DataAmount.Single
    // }
    // this.dataService.GetData(req, 'GetImages').subscribe(
    //   (res: dal.ImageGalleryResponse) => {
    //     this.mainImagePath = this.sanitizer.bypassSecurityTrustStyle(`url('${res.Image.ImageURL
    //       }')`);
    //
    //     this.cacheManager.StoreInCache('currentImageID', res.Image.ID);
    //
    //   },
    //   (err: dal.DataError) => {
    //   }
    // );
    //
    //
    // var req: dal.ImageGalleryRequest = {
    //   CurrentImageID: currentImageID,
    //   Language: dal.Language.Hebrew,
    //   NextData: dal.NextData.Currnet,
    //   DataAmount: dal.DataAmount.All
    // }
    // this.dataService.GetData(req, 'GetImages').subscribe(
    //   (res: dal.ImageGalleryResponse) => {
    //     this.images = res.items;
    //   },
    //   (err: dal.DataError) => {
    //   }
    // );
  }
}
