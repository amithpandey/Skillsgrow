import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Constants } from './../../common/constants';
import { HttpUtil } from './../../common/http.util';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';

@Injectable()


export class AllCoursesProxy {

    constructor(public http: HttpUtil, public mannualHttp: HttpClient) {}

    listCategories() {
        return this.http.doGet(Constants.APIPATH + 'admin/list-categories', false);
    }

}
