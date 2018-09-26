import {Component, Injector, OnDestroy, OnInit} from '@angular/core'
import * as dal from '../../../../../shared/models'
import {Program} from '../../../../../shared/models'
import {Actions} from "../../../store/actions/actions";
import {API_PROGRAMS, LOAD_PRGs} from '../../../store/const';
import {NgRedux} from "@angular-redux/store";
import {Subscription} from "rxjs/Rx";
import {IAppState} from "../../../store/states/state";

@Component({
  templateUrl: "./programs.html",
  styleUrls: ['./programs.scss']

})

export class Programs implements OnInit, OnDestroy {
  // @select('programs') programs$: Observable<dal.Program[]>;

  prgs: Program[];
  private subscription: Subscription;

  constructor(public  actions: Actions, public store: NgRedux<IAppState>) {

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.actions.dispatcAction({actiontype: LOAD_PRGs, url: API_PROGRAMS});
    let obs = this.store.select('programs');
    this.subscription = obs.subscribe((prgs: dal.Program[]) => {
      this.prgs = prgs;
    })
    // var req: dal.DataRequest = { Language: dal.Language.Hebrew };
    // this.dataService.GetData(req, 'GetPrograms').subscribe(
    //     (res: dal.ProgramResponse) => { this.programs = res.items },
    //     (err: dal.DataError) => { console.error('error in items in ngOnInit: ' + err.ErrorText); },
    //     () => { }
    // )
  }
}
