import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { User } from "./user.model";
import { tap } from "rxjs/operators";

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

    user = new Subject<User>();
    // FIREBASE_API_KEY = 'AIzaSyANHaVBWQBXzvOpPlm3SG6aPlFeWof6kvk';

    constructor(private http: HttpClient) { }

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.FIREBASE_API_KEY}`,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        )
        // .pipe(tap(resData => {
        //     const expirationDate = new Date(
        //         new Date().getTime() + +resData.expiresIn * 1000
        //     );

        // })
        // );
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.FIREBASE_API_KEY}`,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        );
    }
}
