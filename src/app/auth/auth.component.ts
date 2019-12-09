import { Component, ComponentFactoryResolver, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthService } from "./auth.service";
import { AlertComponent } from "app/shared/alert/alert.component";
import { PlaceholderDirective } from "app/shared/placeholder/placeholder.directive";
import { l } from "@angular/core/src/render3";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})

export class AuthComponent {
    isLoginMode = true;
    isLoading = false;
    error: string = null;
    @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;

    constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver) { }

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
                this.router.navigate(['/recipes']);
            }, errorRes => {
                console.log(errorRes);
                this.showErrorAlert(errorRes);
                if (errorRes && errorRes.error && errorRes.error.error) {
                    this.error = errorRes.error.error.message;
                }
                this.isLoading = false;
            })
        } else {
            this.authService.signup(email, password).subscribe(res => {
                this.isLoading = false;
                this.router.navigate(['/recipes']);
            }, errorRes => {
                // console.log(errorRes);
                this.showErrorAlert(errorRes);
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
    onHandleError() {
        this.error = null;
    }

    private showErrorAlert(message: string) {
        // const alertComp = new AlertComponent();
        const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear();
        hostViewContainerRef.createComponent(alertComponentFactory);
    }
}