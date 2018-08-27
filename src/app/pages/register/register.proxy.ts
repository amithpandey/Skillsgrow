import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Constants } from './../../common/constants';
import { HttpUtil } from './../../common/http.util';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';

@Injectable()


export class RegisterProxy {

    constructor(public http: HttpUtil, public mannualHttp: HttpClient) {}

    registerDataService(data) {
        return this.http.doPost(Constants.APIPATH + 'admin/web-register', data, true);
    }

}
