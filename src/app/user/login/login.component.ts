import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserAuthorizationService } from 'src/app/services/user-authorization.service';
import { User, UserLogin } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userName: string;
  userPassword: string;
  userRole: string;
  userRoles = ['Student', 'Teacher'];
  loginStatusMessage: string;
  returnUrl: string;

  constructor(private userAuthService: UserAuthorizationService, private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.userName = '';
    this.userPassword = 'password-1';
    this.activatedRoute.queryParamMap.subscribe(queryParams => {
      this.returnUrl = queryParams.get('returnUrl');
    });
  }

  submitHandler(formData: NgForm): void {
    console.log('FormData: ' + this.userName + ' Role: ' + this.userRole);
    const loginUserName = this.userName;
    const loginUserRole = this.userRole;
    this.userAuthService.login(loginUserName, loginUserRole)
      .subscribe((data: any) => {
      const result = {...data};
      if (result.data._id && result.data._id === this.userName
         && result.data.role && result.data.role.toLowerCase() === this.userRole.toLowerCase()) {
        this.loginStatusMessage = 'Successfully logged in';
        let userLogin: UserLogin;
        userLogin = { isLoggedIn: true, loggedInTime: new Date(),
          user: { id: result.data._id, name: result.data.name, role: result.data.role }};
        sessionStorage.setItem('currentUser', JSON.stringify(userLogin));
        this.userAuthService.setUserLogin(userLogin);
        this.userAuthService.setUserLoginStatus(true);
        if (this.returnUrl) {
          this.router.navigate([this.returnUrl]);
        } else if (userLogin.user.role.toLowerCase() === 'student') {
          this.router.navigate(['studentDashboard']);
        } else if (userLogin.user.role.toLowerCase() === 'teacher') {
          this.router.navigate(['teacherDashboard']);
        } else {
          this.router.navigate(['home']);
        }
      } else {
        this.loginStatusMessage = 'Invalid login attempt';
      }
      console.log(this.loginStatusMessage);
    }, (error: any) => {
      this.loginStatusMessage = error.message;
      console.log(this.loginStatusMessage);
    });
  }

  userLoggedIn(): void {}

  resetLoginStatus(): void {
    this.loginStatusMessage = '';
  }

}
