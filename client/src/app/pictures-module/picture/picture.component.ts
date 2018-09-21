import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ImageGalleryItem} from '../../../../../shared/models';

@Component({
  selector: 'ny-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.scss']
})
export class PictureComponent implements OnInit {
  @Input() img: ImageGalleryItem
  @Output() imageSedlected: EventEmitter<number> = new EventEmitter()

  constructor() {
  }

  ngOnInit() {

  }

}
