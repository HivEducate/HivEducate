import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry, map , tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QaByTeacherService {
  teacherQAUrl = 'https://hiveducate-service.mybluemix.net/teacher_qna?tid=';
  postAnswerUrl = 'https://hiveducate-service.mybluemix.net/answer';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  // teacherQAUrl = './assets/mockResponse/teacher_qna.json';
  constructor(private http: HttpClient) { }

  getQAByTeacher(teacherId: string): Observable<any> {
    teacherId = teacherId ? teacherId : '';
    const url = this.teacherQAUrl + teacherId;
    return this.http.get(url).pipe(
      tap( _ => console.log('fetched question and answers')),
      catchError(this.handleError<any>('getQAByTeacher'))
    );
  }

  postAnswer(quetionId: string, teacherId: string, answer: string): Observable<any> {
    const answerRequest = { _id: quetionId, tid: teacherId, answer };
    return this.http.post(this.postAnswerUrl, answerRequest, this.httpOptions)
    .pipe(
      tap((answerRes: any) => console.log(`Successfully posted answer to question w/ id=${answerRes.data[0]._id}`)),
      catchError(this.handleError<any>('postAnswer'))
    );
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
