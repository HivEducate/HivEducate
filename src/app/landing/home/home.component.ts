import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserAuthorizationService } from 'src/app/services/user-authorization.service';
import { UserLogin } from 'src/app/models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isUserLoggedIn: boolean;

  constructor(private router: Router, private userAuthService: UserAuthorizationService) { }

  ngOnInit(): void {
    this.userAuthService.isLoggedIn.subscribe(userLoggedIn => {
      this.isUserLoggedIn = userLoggedIn; });
  }

  routeToLogin(): void {
    this.router.navigate(['login']);
  }

}
