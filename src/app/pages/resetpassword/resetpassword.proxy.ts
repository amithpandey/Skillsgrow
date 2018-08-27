import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Constants } from './../../common/constants';
import { HttpUtil } from './../../common/http.util';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';

@Injectable()


export class ResetPasswordProxy {
    private history = [];

    constructor(public http: HttpUtil, public mannualHttp: HttpClient) {}

    resetPasswordService(token) {
        return this.http.doGet(Constants.APIPATH + 'admin/resetpassword/' + token, false);
    }

    savePasswordService(data) {
        return this.http.doPut(Constants.APIPATH + 'admin/savepassword', data, false);
    }

}
