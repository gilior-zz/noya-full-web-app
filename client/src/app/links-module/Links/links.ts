import {Component, OnInit} from '@angular/core'
import {Link} from '../../../../../shared/models'
import {Actions} from "../../../store/actions/actions";
import {API_LINKS, LOAD_LNKs} from '../../../store/const';
import {NgRedux} from "@angular-redux/store";
import {IAppState} from "../../../store/states/state";

@Component({
  templateUrl: "./links.html",

})

export class Links implements OnInit {

  ImageURL: string;
  public links: Link[];

  constructor(public actions: Actions,
              public store: NgRedux<IAppState>) {

  }

  ngOnInit() {
    this.actions.dispatcAction({actiontype: LOAD_LNKs, url: API_LINKS});
    const obs = this.store.select('links');
    obs.subscribe((links: Link[]) => {
      this.links = links;
    })
  }
}
