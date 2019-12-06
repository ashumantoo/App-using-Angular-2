import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "./auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})

export class AuthComponent {
    isLoginMode = true;
    isLoading = false;
    error: string = null;

    constructor(private authService: AuthService) { }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if (!form.value) {
            return;
        }
        const email = form.value.email;
        const password = form.value.password;

        this.isLoading = true;

        if (this.isLoginMode) {
            this.authService.login(email, password).subscribe(res => {
                this.isLoading = false;
            }, errorRes => {
                console.log(errorRes);
                if (errorRes && errorRes.error && errorRes.error.error) {
                    this.error = errorRes.error.error.message;
                }
                this.isLoading = false;
            })
        } else {
            this.authService.signup(email, password).subscribe(res => {
                this.isLoading = false;
            }, errorRes => {
                // console.log(errorRes);
                if (errorRes && errorRes.error && errorRes.error.error) {
                    switch (errorRes.error.error.message) {
                        case 'EMAIL_EXISTS':
                            this.error = 'This eamil already exists.';
                        default:
                            this.error = "An unknow error occured!";
                    }
                }
                this.isLoading = false;
            });
        }
        form.reset();
    }
}