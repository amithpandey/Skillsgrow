import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Global } from '../../common/global';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-reset-password',
    templateUrl: './comingsoon.component.html',
})

export class ComingSoonComponent implements OnInit {

    constructor(public global: Global,
        public activateRoute: ActivatedRoute, public router: Router) {
    }

    ngOnInit() {
    }
}
