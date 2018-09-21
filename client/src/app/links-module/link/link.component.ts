import {Component, Input, OnInit} from '@angular/core';
import {Link} from '../../dal/models';

@Component({
  selector: 'ny-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class LinkComponent implements OnInit {
@Input() link:Link;
  constructor() { }

  ngOnInit() {
  }

}
