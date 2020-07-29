import { Component, OnInit } from '@angular/core';
import { UserAuthorizationService } from 'src/app/services/user-authorization.service';
import { UserLogin } from 'src/app/models/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  currentUser: UserLogin;
  currentUserRole: string;

  constructor(private userAuthService: UserAuthorizationService) { }

  ngOnInit(): void {
    this.userAuthService. currentUser.subscribe(currentUserLogin => {
      this.currentUser = currentUserLogin;
      if (this.currentUser && this.currentUser.user && this.currentUser.user.role) {
        this.currentUserRole = this.currentUser.user.role.toLowerCase();
      } else {
        this.currentUserRole = null;
      }
    });
  }
} 
