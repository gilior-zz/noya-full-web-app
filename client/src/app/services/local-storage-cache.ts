import {HttpCache} from "./http-cache";
import {HttpRequest, HttpResponse} from "@angular/common/http";
import {CacheManager} from "./services";
import {Injectable} from "@angular/core";

@Injectable()
export class LocalStorageCache implements HttpCache {
  constructor(public cache: CacheManager) {

  }

  get(req: HttpRequest<any>): HttpResponse<any> | any {
    return JSON.parse(this.cache.GetFromCache(req.url,'[]'));
  }

  put(req: HttpRequest<any>, resp: HttpResponse<any>): void {
    this.cache.StoreInCache(req.url, JSON.stringify(resp.body))
  }
}
