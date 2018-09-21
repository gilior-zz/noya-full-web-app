import {Component, Input, OnInit} from '@angular/core';
import {ImageGalleryItem} from '../../dal/models';

@Component({
  selector: 'ny-picture-carousel',
  templateUrl: './picture-carousel.component.html',
  styleUrls: ['./picture-carousel.component.scss']
})
export class PictureCarouselComponent implements OnInit {
  @Input() img: ImageGalleryItem;
  constructor() { }

  ngOnInit() {
  }



}
