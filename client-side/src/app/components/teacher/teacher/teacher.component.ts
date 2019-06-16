import { Component, OnInit } from '@angular/core';
import {TeacherService} from '../../../services/teacher.service';
import {User} from '../../../models/user';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  studentList: Array<User>;
  currentTeacher: User;

  constructor(private teacherService: TeacherService) {
    this.currentTeacher = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.findAllStudentsOfInstructor();
  }

  findAllStudentsOfInstructor(){
    this.teacherService.findAllStudentsOfInstructor(this.currentTeacher.id).subscribe(data => {
      this.studentList = data;
    });
  }

}
