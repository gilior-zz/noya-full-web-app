import {Action, Reducer} from 'redux';
import {composeReducers, defaultFormReducer} from '@angular-redux/form';
import {IAppState} from '../states/state';
import {CARDS_LOADED, CVs_LOADED, HOME_PAGE_TEXT_LOADED, IMGs_LOADED, LNKs_LOADED, MSG_SNT, PRGs_LOADED, VIDs_LOADED} from '../const';
import * as _ from 'lodash'
import {MetaData, Payload} from '../actions/actions';
import {FSA} from 'flux-standard-action';
import {HttpErrorResponse} from '@angular/common/http';

export const appStateReducer: Reducer<IAppState> = (state: IAppState, a: Action): IAppState => {
  const action = a as FSA<Payload, MetaData>;
  let newStore: IAppState = _.cloneDeep(state);
  switch (a.type) {
    case CARDS_LOADED:
      newStore.cards = action.payload['TraverseItems'];
      return newStore;
    case HOME_PAGE_TEXT_LOADED:
      newStore.homePageText = action.payload['HomePageTexts'][0].Text;
      return newStore;
    case CVs_LOADED:
      newStore.biographies = action.payload['CVs'];
      return newStore;
    case IMGs_LOADED:
      newStore.images = action.payload['Images'];
      return newStore;
    case VIDs_LOADED:
      newStore.videos = action.payload;
      return newStore;
    case PRGs_LOADED:
      newStore.programs = action.payload['Programs'];
      return newStore;
    case LNKs_LOADED:
      newStore.links = action.payload['Links'];
      return newStore;
    case MSG_SNT:
      const hide = !action.payload || action.payload instanceof HttpErrorResponse
      newStore.msg_snt = !hide;
      return newStore;
    default:
      return state;
  }
}

export const rootReducer = composeReducers(defaultFormReducer(), appStateReducer)
