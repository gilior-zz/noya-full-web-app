import {Injectable} from '@angular/core'
import {Router, NavigationEnd} from '@angular/router'

import { Subject }    from 'rxjs';
@Injectable()

export class PageNameService {
    private pageName: string;
    private pageNameSubject = new Subject();
    pageNameEvent$ = this.pageNameSubject.asObservable();
    constructor(private router: Router) {
        //this.router.events.subscribe(event => {
        //    if (event instanceof NavigationEnd) {
        //        this.UpdatePageName();
        //        this.firePageNameChanged();
        //    }
        //}
        //)
    }

    UpdatePageName() {
        let url = this.router.routerState.snapshot.url;

        //let urlItems = url.split("/");
        //let p_name = urlItems[2];
        //this.pageName = p_name;
    }

    firePageNameChanged() {
        this.pageNameSubject.next();
    }

    get currentPageName(): string {
        let urlItems = this.router.routerState.snapshot.url.split("/");
        let lastItem = urlItems[urlItems.length - 1];

        return lastItem;
    }

    get currentUrl():string { return this.router.routerState.snapshot.url }

}
