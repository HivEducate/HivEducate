import { Component, OnInit } from '@angular/core';
import { QaByTeacherService } from 'src/app/services/qa-by-teacher.service';
import { UserAuthorizationService } from 'src/app/services/user-authorization.service';
import { UserLogin } from 'src/app/models/user';
import { isNgTemplate } from '@angular/compiler';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { ModalContentComponent } from 'src/app/shared/modal-content/modal-content.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.scss']
})
export class TeacherDashboardComponent implements OnInit {

  currentUser: UserLogin;
  currentUserRole: string;
  qaByTeacherResult: any;
  unasweredQuestions: any;
  customAccordPanel = 'customAccordPanel';
  bsModalRef: BsModalRef;

  constructor(private qaByTeacherService: QaByTeacherService,
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
    if (this.currentUserRole === 'teacher') {
      this.qaByTeacherService.getQAByTeacher(this.currentUser.user.id)
      .subscribe((data: any) => {
        const result = { ...data };
        this.qaByTeacherResult = result.data.map(qAndA => ({ ...qAndA, originalAnswer: qAndA.answer, isBeingEdited: false }));
        console.log(this.qaByTeacherResult);
        this.unasweredQuestions = this.qaByTeacherResult.filter(qa => !qa.answered);
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

  submitAnswer(qAndA, answer): void {
    if (!answer) {
      console.log('Empty response not allowed. Id: ', qAndA._id);
      this.openModal('Error', 'Please enter answer before click on submit.');
      return;
    }
    // console.log('Question ID: ${qAndA?._id}, answer: ${answer}', qAndA?._id, answer);
    this.qaByTeacherService.postAnswer(qAndA._id, this.currentUser.user.id, answer)
      .subscribe((response: any) => {
        const result = { ...response };
        if (result.success && result.data && result.data.length > 0) {
          qAndA.answered = true;
          qAndA.answer = answer;
          qAndA.isBeingEdited = false;
        } else {
          console.log('Error occured while updating the answer. Response: ', JSON.stringify(result));
        }
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

  editAnswer(qAndA): void {
    qAndA.originalAnswer = qAndA.answer;
    qAndA.isBeingEdited = true;
  }

  cancelEdit(qAndA): void {
    qAndA.answer = qAndA.originalAnswer;
    qAndA.isBeingEdited = false;
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
