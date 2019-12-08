import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject, BehaviorSubject } from "rxjs";
import { User } from "./user.model";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";

interface AuthResponseData {
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean
}
@Injectable()
export class AuthService {

    // user = new Subject<User>();
    user = new BehaviorSubject<User>(null);

    // FIREBASE_API_KEY = 'AIzaSyANHaVBWQBXzvOpPlm3SG6aPlFeWof6kvk';

    constructor(private http: HttpClient, private router: Router) { }

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.FIREBASE_API_KEY}`,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(tap(resData => {
            this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        })
        );
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.FIREBASE_API_KEY}`,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(tap(resData => {
            this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        })
        );
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['auth']);
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(
            new Date().getTime() + expiresIn * 1000
        );
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
    }
}
