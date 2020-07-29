import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';

import { User, UserLogin } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserAuthorizationService {
  private currentUserSubject: BehaviorSubject<UserLogin>;
  public currentUser: Observable<UserLogin>;
  // public currentUser = this.currentUserSubject.asObservable();

  private loginStatusSubject: BehaviorSubject<boolean>;
  public isLoggedIn: Observable<boolean>;
  private currentUserValue: UserLogin;

  loginUrl = 'https://hiveducate-service.mybluemix.net/login?usr=';
  // loginUrl = 'assets/mockResponse/login-student.json?usr=';
  // https://jasonwatmore.com/post/2018/11/22/angular-7-role-based-authorization-tutorial-with-example'
  // loginUrl = './assets/mockResponse/login.json';
  constructor(private http: HttpClient) {
    const user = JSON.parse(sessionStorage.getItem('currentUser'));
    this.currentUserSubject = new BehaviorSubject<UserLogin>(user);
    this.currentUser = this.currentUserSubject.asObservable();
    this.currentUser.subscribe(temp => {this.currentUserValue = temp; });
    if (this.currentUserValue) {
      this.loginStatusSubject = new BehaviorSubject<boolean>(true);
    } else {
      this.loginStatusSubject = new BehaviorSubject<boolean>(false);
    }
    this.isLoggedIn = this.loginStatusSubject.asObservable();
  }

  public setUserLoginStatus(loginStatus: boolean): void {
    this.loginStatusSubject.next(loginStatus);
  }

  public setUserLogin(userLogin: UserLogin): void {
    this.currentUserSubject.next(userLogin);
  }

  /*public get currentUserValue(): UserLogin {
    // return this.currentUserSubject.value;
    if (sessionStorage.getItem('currentUser')) {
      const user = JSON.parse(sessionStorage.getItem('currentUser'));
      return user;
    } else {
      return null;
    }
  }*/

  login(userName: string, userRole: string): Observable<any> {
    userName = userName ? userName : '';
    // userId = userId ? userId : 'th-2';
    const url = this.loginUrl + userName;
    return this.http.get(url);
  }

  logout(): void {
    // remove user from session storage to log user out
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
