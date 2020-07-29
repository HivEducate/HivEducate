import { Component, OnInit } from '@angular/core';
import { UserAuthorizationService } from 'src/app/services/user-authorization.service';
import { UserLogin } from 'src/app/models/user';

@Component({
  selector: 'app-primary-panel',
  templateUrl: './primary-panel.component.html',
  styleUrls: ['./primary-panel.component.scss']
})
export class PrimaryPanelComponent implements OnInit {
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
  constructor( private userAuthService: UserAuthorizationService) { }

  ngOnInit(): void {

  }
}
