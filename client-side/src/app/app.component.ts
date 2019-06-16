import { Component } from '@angular/core';
import {UserService} from './services/user.service';
import {User} from './models/user';
import {Role} from './models/role';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client-side';
  currentUser: User;

  constructor(private userService: UserService, private router: Router){
    this.userService.currentUser.subscribe(data => {
      this.currentUser = data;
    });
  }

  logOut(){
    this.userService.logOut().subscribe(data => {
      this.router.navigate(['/login']);
    });
  }

  get isStudent() {
    return this.currentUser && this.currentUser.role === Role.STUDENT;
  }

  get isTeacher() {
    return this.currentUser && this.currentUser.role === Role.TEACHER;
  }

  get isManager() {
    return this.currentUser && this.currentUser.role === Role.MANAGER;
  }
}
