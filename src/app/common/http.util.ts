import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Global } from './global';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

@Injectable()
export class HttpUtil {

    private defaultHeaders = {};

    constructor(private http: HttpClient, private global: Global) {
    }

    public doGet<T>(url: string, disableHeader?: boolean): Observable<T> {
        if (!disableHeader) { this.prepareDefaultHeader(); }
        return this.http.get<T>(url, this.defaultHeaders)
        .share()
        .map((response) => {
                return response;
            }
        );
    }

    public doPost<T>(url: string, data?: T, disableHeader?: boolean): Observable<any> {
        if (!disableHeader) { this.prepareDefaultHeader(); }
        return this.http.post<T>(url, data, this.defaultHeaders).map((response) => {
                return response;
            }
        );
    }

    public doPut<T>(url: string, data?: T, disableHeader?: boolean): Observable<any> {
        if (!disableHeader) { this.prepareDefaultHeader(); }
        return this.http.put<T>(url, data, this.defaultHeaders).map((response) => {
                return response;
            }
        );
    }

    public doDelete<T>(url: string, disableHeader?: boolean): Observable<any> {
        if (!disableHeader) { this.prepareDefaultHeader(); }
        return this.http.delete<T>(url, this.defaultHeaders).map((response) => {
                return response;
            }
        );
    }

    private prepareDefaultHeader() {
        const token: any = this.global.getStorageDetail('token');
        const productionMode: any = this.global.getStorageDetail('develop');
        this.defaultHeaders = {
            headers: new HttpHeaders({
                'x-access-token': (token) ? token.token : '',
                'production-mode' : (productionMode) ? 'true' : 'false'
            })
        };
    }

}
