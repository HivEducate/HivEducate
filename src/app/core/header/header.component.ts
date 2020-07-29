import { Component, OnInit } from '@angular/core';
import { UserAuthorizationService } from 'src/app/services/user-authorization.service';
import { UserLogin } from 'src/app/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentUser: UserLogin;
  currentUserRole: string;
  userId: string;
  userFirstName: string;
  userLastName: string;
  userTitle: string;
  userEmail: string;
  userGrade: string;
  userSubject: string;
  greeting: string;
  greetingMessage: string;
  constructor(private userAuthService: UserAuthorizationService) { }

  ngOnInit(): void {
    this.userAuthService.currentUser.subscribe(currentUserLogin => {
      this.currentUser = currentUserLogin;
      if (this.currentUser && this.currentUser.user && this.currentUser.user.role) {
        this.currentUserRole = this.currentUser.user.role.toLowerCase();
      }
      if (this.currentUser && this.currentUser.user) {
        this.userFirstName = this.currentUser.user.name;
        this.userTitle = '';
        this.greeting = '';
        this.greetingMessage = this.greeting.concat(' ', this.userTitle, ' ', this.userFirstName);
      }
    });
  }

  signOutUser(): void {
    this.userAuthService.logout();
  }

}
