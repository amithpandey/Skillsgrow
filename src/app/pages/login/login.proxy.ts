import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Constants } from './../../common/constants';
import { HttpUtil } from './../../common/http.util';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';

@Injectable()


export class LoginProxy {
    private history = [];

    constructor(public http: HttpUtil, public mannualHttp: HttpClient) {}

    loginDataService(data) {
        return this.http.doPost(Constants.APIPATH + 'admin/web-login', data, true);
    }

    forgotPasswordService(data) {
        return this.http.doPut(Constants.APIPATH + 'admin/resetpassword', data, true);
    }

}
