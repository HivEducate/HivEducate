import { Component, OnInit } from '@angular/core';
import { UserAuthorizationService } from 'src/app/services/user-authorization.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'HivEducate';
  isLogin = false;
  constructor(private userAuthService: UserAuthorizationService) {}

  ngOnInit(): void {
    this.userAuthService.isLoggedIn.subscribe(loginStatus => {
      this.isLogin = loginStatus;
    });
  }
}
