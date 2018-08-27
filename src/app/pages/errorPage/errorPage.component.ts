import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Global } from '../../common/global';

@Component({
    selector: 'app-error-page',
    templateUrl: './errorPage.component.html'
})

export class ErrorPageComponent implements OnInit {
    constructor(public global: Global) {
    }

    ngOnInit() {
    }

}
