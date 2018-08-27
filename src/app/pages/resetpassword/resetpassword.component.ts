import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Global } from '../../common/global';
import { ResetPasswordProxy } from './resetpassword.proxy';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-reset-password',
    templateUrl: './resetpassword.component.html',
    providers: [ResetPasswordProxy]
})

export class ResetPasswordComponent implements OnInit {

    resetFormObj = {
        newPassword: '',
        confirmPassword: '',
        emailId: ''
    };
    public token: any;
    public successMessage: boolean = false;
    public errorMessage: boolean = false;
    public message: any;

    constructor(public global: Global, public resetpasswordproxy: ResetPasswordProxy,
        public activateRoute: ActivatedRoute, public router: Router) {
    }

    ngOnInit() {
        this.activateRoute.params.forEach(params => {
            this.token = params['token'];
        });
        console.log(this.token);
        this.resetpasswordproxy.resetPasswordService(this.token)
            .subscribe((success: any) => {
                console.log(success);
                if (success.data) {
                    this.resetFormObj.emailId = success.data.emailId;
                } else {
                    this.errorMessage = true;
                    this.message = 'This link is expired......redirecting to home page';
                    setTimeout(() => {
                        this.global.navigateToNewPage('/home');
                    }, 5000);
                }
            });
    }

    onSubmit() {
        this.resetpasswordproxy.savePasswordService(this.resetFormObj)
            .subscribe((success: any) => {
                console.log(success);
                if (success.result) {
                    this.successMessage = true;
                    this.errorMessage = false;
                    this.message = success.message + '.............redirecting to login page';
                    setTimeout(() => {
                        this.global.navigateToNewPage('/login');
                    }, 2000);
                }
            });
    }
}
