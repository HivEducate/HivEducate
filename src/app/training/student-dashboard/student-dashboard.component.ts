import { Component, OnInit } from '@angular/core';
import { QaByStudentService } from 'src/app/services/qa-by-student.service';
import { UserAuthorizationService } from 'src/app/services/user-authorization.service';
import { UserLogin } from 'src/app/models/user';
import { isNgTemplate } from '@angular/compiler';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { ModalContentComponent } from 'src/app/shared/modal-content/modal-content.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss']
})
export class StudentDashboardComponent implements OnInit {

  currentUser: UserLogin;
  currentUserRole: string;
  qaByStudentResult: any;
  unasweredQuestions: any;
  unseenQuestions: any;
  customAccordPanel = 'customAccordPanel';
  bsModalRef: BsModalRef;

  constructor(private qaByStudentService: QaByStudentService,
              private userAuthService: UserAuthorizationService,
              private modalService: BsModalService,
              private router: Router) { }

  ngOnInit(): void {
    this.userAuthService.currentUser.subscribe(currentUserLogin => {
      this.currentUser = currentUserLogin;
    });
    if (!this.currentUser){
      console.log('Current user null');
      this.router.navigateByUrl('login?returnUrl=' + this.router.url);
    }
    if (this.currentUser && this.currentUser.user && this.currentUser.user.role) {
      this.currentUserRole = this.currentUser.user.role.toLowerCase();
    }
    if (this.currentUserRole === 'student') {
      this.qaByStudentService.getQAByStudent(this.currentUser.user.id)
      .subscribe((data: any) => {
        const result = { ...data };
        this.qaByStudentResult = result.data.map(qAndA => ({ ...qAndA, originalAnswer: qAndA.answer, isBeingEdited: false }));
        // console.log(this.qaByStudentResult);
        this.unasweredQuestions = this.qaByStudentResult.filter(qa => !qa.answered);
      }, (error: any) => {
        console.log('error:', error);
        const list = [];
        list.push('Status code: ' + error.status );
        if (error.statusText) {
          list.push('Status description: ' + error.statusText );
        }
        if (list.length > 0) {
          this.openModal('Error', 'Something bad happened; please try again later.', list);
        } else {
          this.openModal('Error', 'Something bad happened; please try again later.');
        }
      });
    }
  }

  private openModal(titleMsg: string, contentMsg: string, listMsg?: string[]): void {
    const initialState = {
      list: listMsg ? listMsg : [],
      title: titleMsg,
      content: contentMsg
    };
    this.bsModalRef = this.modalService.show(ModalContentComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Close';
  }
}
