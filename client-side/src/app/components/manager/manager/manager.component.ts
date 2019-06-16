import { Component, OnInit } from '@angular/core';
import {ManagerService} from '../../../services/manager.service';
import {User} from '../../../models/user';
import {CourseStudent} from '../../../models/coursestudent';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {

  enrollmentList: Array<CourseStudent>;
  currentManager: User;

  constructor(private managerService: ManagerService) {
    this.currentManager = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.findAllEnrollments();
  }

  findAllEnrollments(){
    this.managerService.findAllEnrollments().subscribe(data => {
      this.enrollmentList = data;
    });
  }

}
