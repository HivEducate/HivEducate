import { Component, OnInit } from '@angular/core';
import { TabsetComponent, TabDirective } from 'ngx-bootstrap/tabs';
import { QaByTeacherService } from 'src/app/services/qa-by-teacher.service';
import { QaByStudentService } from 'src/app/services/qa-by-student.service';
import { UserAuthorizationService } from 'src/app/services/user-authorization.service';
import { UserLogin } from 'src/app/models/user';

@Component({
  selector: 'app-qa-panel',
  templateUrl: './qa-panel.component.html',
  styleUrls: ['./qa-panel.component.scss']
})
export class QaPanelComponent implements OnInit {

  currentUser: UserLogin;
  currentUserRole: string;
  qaByTeacherResult: any;
  unasweredQuestions: any;
  qaByStudentResult: any;
  unasweredStdQuestions: any;

  constructor(private qaByTeacherService: QaByTeacherService,
              private qaByStudentService: QaByStudentService,
              private userAuthService: UserAuthorizationService) { }

  ngOnInit(): void {

  }
}
