import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Constants } from './../../common/constants';
import { HttpUtil } from './../../common/http.util';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';

@Injectable()


export class HomeProxy {

    constructor(public http: HttpUtil, public mannualHttp: HttpClient) {}

    bannerImages() {
        return this.http.doGet(Constants.APIPATH + 'admin/list-banner-images');
    }

}
