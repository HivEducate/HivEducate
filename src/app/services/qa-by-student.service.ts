import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QaByStudentService {
  studentQAUrl = 'https://hiveducate-service.mybluemix.net/student_qna?sid=';
  // studentQAUrl = './assets/mockResponse/student_qna.json?sid=';

  // teacherQAUrl = './assets/mockResponse/teacher_qna.json';
  constructor(private http: HttpClient) { }

  getQAByStudent(studentId: string): Observable<any> {
    studentId = studentId ? studentId : '';
    // teacherId = teacherId ? teacherId : 'th-2';
    const url = this.studentQAUrl + studentId;
    return this.http.get(url);
  }

  private handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
/*
      if (error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong.
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.message}`);
      } */
      // Return an observable with a user-facing error message.
      return throwError(error);
      //  'Something bad happened; please try again later.');
      // return of(result as T);
    };
  }
}
