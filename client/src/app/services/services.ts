import {catchError, map} from 'rxjs/operators';

import {Injectable} from '@angular/core'

import * as model from '../dal/models'
import {DataResponse, Language} from '../dal/models'
import {Observable, of} from 'rxjs';

import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';


@Injectable()
export class CacheManager {
  constructor() {
  }

  get Language(): Language {
    let lang = this.GetFromCache('lang', Language.Hebrew);
    return lang;
  }

  public StoreInCache(key: string, value: any): void {
    sessionStorage.setItem(key, value);
  }

  public GetFromCache(key: string, defaultValue: any = null): any {
    var retVal = sessionStorage.getItem(key);
    if (!retVal && defaultValue != null)
      retVal = defaultValue;
    return retVal;
  }

  public RemoveFromCache(key: string): void {
    sessionStorage.removeItem(key);
  }

  public ClearCache(): void {
    sessionStorage.clear();
  }


}


@Injectable()

export class DataService {

  endPoint: string = 'https://noyaschleien.com/api/Data/'

  //public GetData(request: model.DataRequest, url: string): Promise<model.DataResponse> {
  //    let body = JSON.stringify({ request });
  //    let headers = new Headers({ 'Content-Type': 'application/json' });
  //    let options = new RequestOptions({ headers: headers });
  //    return this.http.post(url, body, options)
  //        .toPromise()
  //        .then(this.extractData)
  //        .catch(this.handleError);
  //}


  //private extractData(res: Response): model.DataResponse {
  //    if (res.status < 200 || res.status >= 300) {
  //        throw new Error('Bad response status: ' + res.status);
  //    }
  //    let body = res.json();
  //    return body;
  //}
  nodeEndPoint: string = '/api/Data/'

  constructor(private http: HttpClient, private CacheManager: CacheManager) {
  }

  public GetFileContent(filePath: string) {
    return this.http.get(filePath).pipe(map(res => res))
    //.do(data => //console.log(data)) // eyeball results in the console
    //.catch(this.handleError)
  }

  /** POST: add a new hero to the database */
  public PostData(url: string, request: any): Observable<DataResponse | {}> {
    var lang = this.CacheManager.GetFromCache('lang', model.Language.Hebrew);
    var num_lang: Language = +this.CacheManager.GetFromCache('lang', '0');
    if (!request) request = {};
    request.Language = num_lang;
    let body = JSON.stringify({request});
    console.log('req', request)
    return this.http.post<DataResponse>(`${this.endPoint}${url}`, body, {
      headers: {'content-type': 'application/json'},
      params: new HttpParams().set('lang', Language[lang])
    })
      .pipe(
        catchError(this.handleError)
      );
  }


  public GetData(url: string): Observable<DataResponse | {}> {


    var lang = this.CacheManager.GetFromCache('lang', model.Language.Hebrew);
    console.log('req', {})
    return this.http.post<DataResponse>(`${this.endPoint}${url}`, {"request": {"Language": 0}}, {
      headers: {'content-type': 'application/json'},
      params: new HttpParams().set('lang', Language[lang])
    })
      .pipe(
        catchError(this.handleError)
      );
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return of(error)
  };


}


/**
 * Async modal dialog service
 * DialogService makes this app easier to test by faking this service.
 * TODO: better modal implemenation that doesn't use window.confirm
 */

export class DialogService {
  /**
   * Ask user to confirm an action. `message` explains the action and choices.
   * Returns promise resolving to `true`=confirm or `false`=cancel
   */
  confirm(message?: string) {
    return new Promise<boolean>((resolve, reject) => {
      return resolve(window.confirm(message || 'Is it OK?'))
    })
  }


}

export class LogService {
  public writeToLog(msg: string) {
    //log.debug(msg, ['a','b','c']);
  }
}


@Injectable()
export class TranslationService {
  translationFile = {
    'menu': 'תפריט',
    'noya schleien': 'נויה שליין',
    'marimba & percussion': 'מרימבה וכלי הקשה',
    'home': 'בית',
    'biography': 'ביוגרפיה',
    'pictures': 'תמונות',
    'videos': 'וידאו',
    'programs': 'תכניות',
    'links': 'קישורים',
    'contact': 'יצירת קשר',
    'hey noya, i would like to get some details about your concerts. please contact me': 'שלום נויה, אנא צרי עמי קשר על מנת לקבל פרטים אודות קונצרט',

    'email': 'אי-מייל',
    'content': 'תוכן',
    'order concert': 'הזמנת קונצרט',
    'products': 'חנות מוצרים',
    'kids art': 'עולם הילדים',
    'coming soon...': 'בקרוב...',
    'galilu': 'גלילו',
    'custom designed products for toddlers': 'מוצרים לקטנטנים בעיצוב אישי',
    'toddlers activity pallet': 'משטח פעילות לקטנטנים',
    'toddlers activity books': 'ספרי פעילות לקטנטנים',
    'toddlers lamps': 'מנורות לקטנטנים',
    'toddlers bags': 'תיקים לקטנטנים',
    'toddlers cushions': 'כריות לקטנטנים',
    'to store': 'לחנות',
    'back to previous page': 'חזרה לעמוד קודם',
    'must select at leat 4 items (click om item to select/deselect item)': 'יש לבחור לפחות 4 פריטים',
    'click on item to select/deselect item': 'יש ללחוץ על פריט כדי לבחור / לבטל את בחירתו',
    'message': 'הודעה',
    'name': 'שם',
    'message is required': 'יש להזין הודעה',
    'submit': 'שליחה',
    'name is required': 'יש להזין שם',
    'email is required': 'יש להזין אימייל',
    'content is required': 'יש להזין תוכן',
    'invalid email': 'אימייל אינו חוקי',
    'language': 'שפה',
    'message sent to noya': 'הודעה נשלחה לנויה',
    'continue': 'המשך',
    'success': 'הצלחה',
    'send': 'שליחה',
    'phone': 'טלפון'

  };

  constructor(private cacheManager: CacheManager) {
  }

  public TranlateItem(value: string): string {
    if (!value) return;
    var lang = this.cacheManager.GetFromCache('lang', model.Language.Hebrew);
    if (lang == 0)//hewbrew
    {
      let translateItem = this.translationFile[value.trim().toLowerCase()];
      if (!translateItem)
        return value;
      return translateItem;
    }
    if (lang == 1)//english
    {
      return value;
    }
  }
}


@Injectable()
export class youTubeService {

  constructor(private http: HttpClient) {
  }

  public fetchVideos(): Observable<any> {
    //return Observable.of(null);
    let params = new HttpParams();
    params = params.set('part', 'snippet');
    params = params.set('playlistId', 'UUO2Xi-wHrqM27neDaVrfebQ');
    params = params.set('maxResults', '50');
    params = params.set('key', 'AIzaSyBH2ltO-MFMiW7dftsCCM3w8F86M-kwDHM');
    return this.http.get('https://www.googleapis.com/youtube/v3/playlistItems', {params: params}).pipe(map(
      k => k['items']))
  }

}


