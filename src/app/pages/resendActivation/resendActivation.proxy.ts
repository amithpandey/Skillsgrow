import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Constants } from './../../common/constants';
import { HttpUtil } from './../../common/http.util';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';

@Injectable()


export class ResendActivationProxy {
    private history = [];

    constructor(public http: HttpUtil, public mannualHttp: HttpClient) { }

    resendActivationData(data) {
        return this.http.doPost(Constants.APIPATH + 'admin/resend', data, false);
    }

    resendLink(data) {
        return this.http.doPut(Constants.APIPATH + 'admin/resendlink', data, false);
    }

}
