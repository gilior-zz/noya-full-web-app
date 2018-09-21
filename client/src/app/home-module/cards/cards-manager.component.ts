import {Component, HostListener, OnDestroy, OnInit} from '@angular/core'
import {TraverseItem} from '../../../../../shared/models'
import {UtiltyService} from '../../services/utitlity'

import {IAppState} from '../../../store/states/state';
import {NgRedux} from '@angular-redux/store';
import {LOAD_CARDS} from '../../../store/const';

import {Actions} from '../../../store/actions/actions';
import {Subscription} from 'rxjs/Rx';


@Component({
  selector: 'cards-manager',
  templateUrl: './cards-manager.component.html',
  styleUrls: ['./cards-manager.component.scss']
})

export class CardsManagerComponent implements OnInit, OnDestroy {
  public cards: Array<TraverseItem>;
  private subscription: Subscription;

  constructor(private utiltyService: UtiltyService,
              public actions: Actions,
              public store: NgRedux<IAppState>) {

  }

  get showTrio(): boolean {
    return this.utiltyService.IsDesktop || this.utiltyService.IsTablet;
  }

  get showDuo(): boolean {
    return this.utiltyService.IsPhablet;
  }

  get showOne(): boolean {
    return this.utiltyService.IsMobile;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  @HostListener('window:resize')
  onResize() {

  }

  ngOnInit() {
    let obs = this.store.select('cards');
    this.subscription = obs.subscribe((cards: Array<TraverseItem>) => {
      this.cards = cards;
    })
    this.actions.dispatcAction({actiontype: LOAD_CARDS, url: 'GetTraverseItems'});
  }
}



