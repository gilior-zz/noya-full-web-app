import {map, switchMap} from 'rxjs/operators';

import {Injectable} from "@angular/core";
import {CacheManager, DataService, youTubeService} from "../../app/services/services";
import {Epic, ofType} from "redux-observable";
import {LOAD_VIDs, MSG_SNT, VIDs_LOADED} from "../const";
import {DataRequest, Language, VideoItem} from "../../app/dal/models";
import {IAppState} from "../states/state";
import {Actions, MetaData, Payload} from "../actions/actions";
import {FSA} from "flux-standard-action";


@Injectable()
export class Epics {
  lang: Language = +this.cacheManager.GetFromCache('lang', '0');
  req: DataRequest = {Language: this.lang}
  private SessionActions: any;
  private http: any;
  private BASE_URL: any;

  constructor(public dataService: DataService, private cacheManager: CacheManager, public  homeAPIActions: Actions, private yts: youTubeService) {
  }

  public createDataServiceEpic(actionType: string, nextActionType?: string, verb: string = 'GetData'): Epic<FSA<Payload, MetaData>, IAppState> {
    return (action$, store) => action$.pipe(ofType(actionType)).pipe(
      switchMap((action: FSA<Payload, MetaData>) => this.dataService[verb](action.meta.url, action.payload)),
      map((data) => {
        return this.homeAPIActions.doAction({actiontype: nextActionType}, nextActionType === MSG_SNT ? true : data)
      }))
  }

  public createVideoEpic(): Epic<FSA<Payload, MetaData>, IAppState> {
    let l = this.lang == Language.English ? 'en' : 'he';
    let items: Array<VideoItem> = [];
    return (action$, store) => action$.ofType(['type'][LOAD_VIDs]).pipe(
      switchMap((action: FSA<Payload, MetaData>) => this.yts.fetchVideos().pipe(
        map((data) => {
          (<Array<any>>data).forEach(j => {
            items.push({title: j['snippet']['title'], videoId: j['snippet']['resourceId']['videoId'], lang: l})
          })
          return this.homeAPIActions.doAction({actiontype: VIDs_LOADED}, items)
        }))))
  }
}
