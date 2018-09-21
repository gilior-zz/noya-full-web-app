import {Component, OnDestroy, OnInit} from '@angular/core'
import {UtiltyService} from '../../services/utitlity'
import {LOAD_HOME_PAGE_TEXT} from "../../../store/const";
import {Actions} from "../../../store/actions/actions";
import {NgRedux} from "@angular-redux/store";
import {IAppState} from "../../../store/states/state";
import {Subscription} from "rxjs/Rx";


@Component({
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})


export class Home implements OnInit, OnDestroy {
  public homePageText: string;
  private subscription: Subscription;

  constructor(public actions: Actions,
              public utiltyService: UtiltyService,
              public store: NgRedux<IAppState>) {

  }

  get isHeb(): boolean {
    return this.utiltyService.IsHebrewMode;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {

  }

  ngOnInit() {

    this.actions.dispatcAction({actiontype: LOAD_HOME_PAGE_TEXT, url: 'GetHomePageText'});

    let obs = this.store.select('homePageText');
    this.subscription = obs.subscribe((homePageText: string) => {
      this.homePageText = homePageText;
    })
  }


}
