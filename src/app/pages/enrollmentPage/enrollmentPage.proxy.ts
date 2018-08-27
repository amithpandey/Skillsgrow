import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Constants } from './../../common/constants';
import { HttpUtil } from './../../common/http.util';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';

@Injectable()


export class EnrollmentPageProxy {
    private history = [];

    constructor(public http: HttpUtil, public mannualHttp: HttpClient) {}

    listCategories() {
        return this.http.doGet(Constants.APIPATH + 'admin/list-categories', false);
    }

    courseEnrolledService(data) {
        return this.http.doPut(Constants.APIPATH + 'admin/course-enrolled', data, false);
    }

    userCourseEnrolledService(data) {
        return this.http.doPost(Constants.APIPATH + 'admin/user-course-enrolled', data, false);
    }

}
