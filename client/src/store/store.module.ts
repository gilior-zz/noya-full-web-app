import {NgModule} from '@angular/core';
import {DevToolsExtension, NgRedux, NgReduxModule} from '@angular-redux/store';
import {NgReduxRouter, NgReduxRouterModule} from '@angular-redux/router';
import {IAppState, initState} from './states/state';
import {rootReducer} from './reducers/app-state.reducer';
import {provideReduxForms} from '@angular-redux/form';
import {Epics} from "./epics/epics";
import {createEpicMiddleware} from "redux-observable";
import {
  CARDS_LOADED,
  CVs_LOADED,
  HOME_PAGE_TEXT_LOADED,
  IMGs_LOADED,
  LNKs_LOADED,
  LOAD_CARDS,
  LOAD_CVs,
  LOAD_HOME_PAGE_TEXT,
  LOAD_IMGs,
  LOAD_LNKs,
  LOAD_PRGs,
  MSG_SNT,
  PRGs_LOADED,
  SND_MSG
} from "./const";


@NgModule({
  imports: [NgReduxRouterModule.forRoot()],
  exports: [NgReduxModule, NgReduxRouterModule],
  providers: [Epics]
})

export class StoreModule {
  constructor(public store: NgRedux<IAppState>,
              public  devTools: DevToolsExtension,
              public ngReduxRouter: NgReduxRouter, private epics: Epics) {

    const middleware = [
      //createLogger(),
      createEpicMiddleware(this.epics.createVideoEpic()),
      createEpicMiddleware(this.epics.createDataServiceEpic(LOAD_CARDS, CARDS_LOADED, 'GetData')),
      createEpicMiddleware(this.epics.createDataServiceEpic(LOAD_HOME_PAGE_TEXT, HOME_PAGE_TEXT_LOADED, 'PostData')),
      createEpicMiddleware(this.epics.createDataServiceEpic(LOAD_CVs, CVs_LOADED, 'PostData')),
      createEpicMiddleware(this.epics.createDataServiceEpic(LOAD_IMGs, IMGs_LOADED, 'PostData')),
      createEpicMiddleware(this.epics.createDataServiceEpic(LOAD_PRGs, PRGs_LOADED, 'PostData')),
      createEpicMiddleware(this.epics.createDataServiceEpic(LOAD_LNKs, LNKs_LOADED, 'PostData')),
      createEpicMiddleware(this.epics.createDataServiceEpic(SND_MSG, MSG_SNT, 'PostData')),
    ];
    store.configureStore(rootReducer,
      initState, middleware,
      devTools.isEnabled() ? [devTools.enhancer()] : [])

    if (ngReduxRouter) {
      ngReduxRouter.initialize();
    }
    provideReduxForms(store);
  }
}
