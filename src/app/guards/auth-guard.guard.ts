import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthorizationService } from 'src/app/services/user-authorization.service';
import { UserLogin } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  currentUser: UserLogin;
  constructor(private router: Router, private authenticationService: UserAuthorizationService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.authenticationService.currentUser.subscribe( user => { this.currentUser = user; });
    if (this.currentUser) {
      // check if route is restricted by role
      if (next.data.roles && next.data.roles.indexOf(this.currentUser.user.role) === -1) {
        // role not authorised so redirect to home page
        this.router.navigate(['/']);
        return false;
      }
      return true;
    } else {
      console.log ('next.url:', next.url);
      return this.router.parseUrl('/login?returnUrl=' + next.url);
    }
  }
}
