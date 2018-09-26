import {Component, OnInit, Injector, HostBinding, OnDestroy} from '@angular/core'
import {BaseComponent} from '../../common/base.component'
import {Router} from '@angular/router'
import * as services from '../../services/services'
import * as dal from '../../../../../shared/models'

import {Observable} from 'rxjs';
import {Actions} from "../../../store/actions/actions";
import {API_CV, LOAD_CVs} from '../../../store/const';
import {NgRedux, select} from "@angular-redux/store";
import {IAppState} from "../../../store/states/state";
import {CV} from "../../../../../shared/models";
import {Subscription} from "rxjs/Rx";

@Component({
  templateUrl: "./biography.html",

  //animations:[slideInDownAnimation]

})

export class Biography  implements OnInit,OnDestroy {
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  // @select('biographies') cvs$: Observable<dal.CV[]>;
  cvs: CV[];
  private subscription: Subscription;


  constructor(public actions: Actions,
              public store: NgRedux<IAppState> ) {

  }

  //@HostBinding('@routeAnimation') routeAnimation = true;
  //@HostBinding('style.display') display = 'block';
  //@HostBinding('style.position') position = 'absolute';

  ngOnInit() {
    this.actions.dispatcAction({actiontype: LOAD_CVs, url: API_CV});
    let obs = this.store.select('biographies');
    this.subscription = obs.subscribe((cvs: dal.CV[]) => {
      this.cvs = cvs;
    })
    // var req: dal.DataRequest = { Language: dal.Language.Hebrew };
    // this.dataService.GetData(req, 'GetCV').subscribe(
    //     (res: dal.CVResponse) => { this.cvs = res.CVs },
    //     (err: dal.DataError) => { console.error('error in biography in ngOnInit: ' + err.ErrorText); },
    //     () => { }
    // )

  }
}
