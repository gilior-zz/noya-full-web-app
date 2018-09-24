import {Component, Input, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations'
import {Message, TraverseItem} from '../../../../../shared/models'
import * as $ from 'jquery';

@Component({
  selector: 'traverse-item',

  templateUrl: './traverse-item.component.html',
  styleUrls: ['./traverse-item.component.scss'],

  animations: [

    trigger('contentImageState', [
      state('active', style({opacity: 1, visibility: 'visible', display: 'inline'})),
      state('inactive', style({opacity: 0, visibility: 'hidden', display: 'none'})),
      //transition('active => inactive', [
      //    style({ opacity: 1 }),
      //    animate('1s')
      //]),
      transition('inactive => active', [
        style({opacity: 0}),
        animate('1s')
      ])
    ]),
    trigger('contentTextState', [
      state('active', style({opacity: 1, visibility: 'visible'})),
      state('inactive', style({opacity: 0, visibility: 'hidden'})),
      //transition('active => inactive', [
      //    style({ opacity: 1 }),
      //    animate('1s')
      //]),
      transition('inactive => active', [
        style({opacity: 0}),
        animate('1s')
      ])
    ]),
  ]
})
export class TraverseItemComponent implements OnInit {
  isCollapsed: boolean;
  @Input() traverseItem: TraverseItem;
  person = {Email: '', Name: ''};
  contentImageState: string = 'active';
  contentTextState: string = 'inactive';
  isImageMode: boolean = true;
  displaySubmitError: boolean;
  isSubmitting: boolean;
  submitted: boolean;
  message: Message;
  modalState: string = 'none';

  constructor() {
  }

  ngOnInit() {
    this.message = {Content: '', Date: new Date(), IP: '', Sender: {Email: this.person.Email, Name: this.person.Name}};
  }

  fixCardTextHeight(img: HTMLDivElement, content: HTMLDivElement) {

    let l = img.clientHeight - 25;
    $(content).height(`${l}px`);
  }

  toggleImageMode() {
    this.isImageMode = !this.isImageMode;
    this.contentImageState = this.isImageMode ? 'active' : 'inactive';
    this.contentTextState = this.isImageMode ? 'inactive' : 'active';
  }

  public toggleModalState(state: string): void {
    //console.log(this.modalState);
    this.modalState = state;
    //console.log(this.modalState);

  }


  logMe(event: any) {
    //console.log(event);
  }


}
