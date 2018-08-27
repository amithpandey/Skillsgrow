import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Constants } from './../../common/constants';
import { HttpUtil } from './../../common/http.util';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';

@Injectable()


export class CourseTestPageProxy {
    private history = [];

    constructor(public http: HttpUtil, public mannualHttp: HttpClient) {}

    userScore(data) {
        console.log(data);
        return this.http.doPost(Constants.APIPATH + 'admin/user-score', data, false);
    }
}
