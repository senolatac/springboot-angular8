import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from '../models/user';
import {Course} from '../models/course';
import {CourseStudent} from '../models/coursestudent';

let API_URL = "http://localhost:8080/api/user/";
let STUDENT_API_URL = "http://localhost:8080/api/student/";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public currentUser: Observable<User>;
  private currentUserSubject: BehaviorSubject<User>;
  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  setHeaders() {
    this.headers = new HttpHeaders({
      authorization:'Bearer ' + this.currentUserSubject.value.token,
      "Content-Type":"application/json; charset=UTF-8"
    });
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(user: User): Observable<any> {
    const headers = new HttpHeaders(
      user ? {
        authorization:'Basic ' + btoa(user.username + ':' + user.password)
      } : {}
    );

    return this.http.get<any> (API_URL + "login", {headers:headers}).pipe(
      map(response =>{
        if(response){
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.currentUserSubject.next(response);
        }
        return response;
      })
    );
  }

  logOut(): Observable<any> {
    return this.http.post(API_URL + "logout", {}).pipe(
      map(response => {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
      })
    );
  }

  register(user: User): Observable<any> {
    return this.http.post(API_URL + "registration", JSON.stringify(user),
  {headers: {"Content-Type":"application/json; charset=UTF-8"}});
  }

  findAllCourses(): Observable<any> {
    return this.http.get(API_URL + "courses",
  {headers: {"Content-Type":"application/json; charset=UTF-8"}});
  }

  findAllCoursesOfStudent(studentId: string): Observable<any> {
    this.setHeaders();
    return this.http.get(STUDENT_API_URL + "courses/"+studentId, {headers: this.headers});
  }

  enroll(courseStudent: CourseStudent): Observable<any> {
    this.setHeaders();
    return this.http.post(STUDENT_API_URL + "enroll", JSON.stringify(courseStudent), {headers: this.headers});
  }
}
