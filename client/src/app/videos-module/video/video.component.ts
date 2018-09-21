import {Component, Input, OnInit} from '@angular/core';
import {VideoItem} from '../../../../../shared/models';

@Component({
  selector: 'ny-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  @Input() video: VideoItem;

  constructor() {
  }

  ngOnInit() {
  }

}
