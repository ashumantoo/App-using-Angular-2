import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map, tap, take } from "rxjs/operators";
import { Injectable } from "@angular/core";

import { AuthService } from "./auth.service";


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot):
        Observable<boolean> | Promise<boolean> | boolean {
        return this.authService.user.pipe(
            take(1),
            map(user => {
                return !!user;
                // const isAuth = !!user;
                // if (isAuth) {
                //     return true;
                // }
                // return this.router.createUrlTree(['/auth']);
            }),
            tap(isAuth => {
                if (!isAuth) {
                    this.router.navigate(['/auth']);
                }
            })
        );
    }
}