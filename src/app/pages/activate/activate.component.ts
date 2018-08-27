import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Global } from '../../common/global';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivateProxy } from './activate.proxy';

@Component({
    selector: 'app-reset-password',
    templateUrl: './activate.component.html',
    providers: [ActivateProxy]
})

export class AccountActivationComponent implements OnInit {
    public token: any;
    public successMessage: boolean = false;
    public errorMessage: boolean = false;

    constructor(public global: Global,
        public activateRoute: ActivatedRoute, public router: Router,
        public activateproxy: ActivateProxy) {
    }

    ngOnInit() {
        this.activateRoute.params.forEach(params => {
            this.token = params['token'];
        });
        this.activateproxy.activateAccount(this.token)
        .subscribe((success) => {
            console.log(success);
            if (success.result) {
                this.successMessage = true;
                setTimeout(() => {
                    this.global.navigateToNewPage('/login');
                }, 2000);
            } else {
                this.errorMessage = true;
                setTimeout(() => {
                    this.global.navigateToNewPage('/home');
                }, 2000);
            }
        });
    }
}
