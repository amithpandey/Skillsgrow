import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import { filter } from 'rxjs/operators';

@Injectable()
export class Global {
    previousUrl: string;
    currentUrl: string;

    constructor(private localStorage: LocalStorageService,
        public router: Router, public route: ActivatedRoute) {
            this.router.events
            .filter((event) => event instanceof NavigationEnd)
            .subscribe(
            (e: any) => {
            this.previousUrl = this.currentUrl;
            this.currentUrl = e.url;
        });
    }

    public url() {
        return {currentUrl: this.currentUrl, previousUrl: this.previousUrl};
    }
    /*
     * store  data into local storage.
     */
    public storeDataLocal(key: string, data: any): void {
        this.localStorage.add(key, data);
    }

    /*
     * get local storage data details.
     */
    public getStorageDetail(key: string): any {
        return this.localStorage.get(key);
    }

    /*
     * delete local storage data.
     */
    public deleteLocalData(key: string): void {
        this.localStorage.remove(key);
    }

    /* clear local storage data */
    public clearLocalStorage(): void {
        this.localStorage.clearAll();
    }

    /*
     * will be used to navigate to different pages. without parameter
     */
    public navigateToNewPage(path: string): void {
        this.router.navigateByUrl(path);
    }

    public sessionAuthenticationFailed(): void {
        /*this.deleteLocalData(Constants.LOGINSESSION);*/
        this.navigateToNewPage('/login');
    }

}

