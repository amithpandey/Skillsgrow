import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Constants } from './../../common/constants';
import { HttpUtil } from './../../common/http.util';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';

@Injectable()


export class CourseDetailsPageProxy {
    private history = [];

    constructor(public http: HttpUtil, public mannualHttp: HttpClient) {}

    courseReviewService(data) {
        return this.http.doPost(Constants.APIPATH + 'admin/course-review', data, true);
    }

}
