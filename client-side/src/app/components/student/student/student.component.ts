import { Component, OnInit } from '@angular/core';
import {User} from "../../../models/user";
import {Course} from "../../../models/course";
import {ActivatedRoute} from "@angular/router";
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  studentId: string;
  currentStudent: User;
  courseList: Array<Course>;

  constructor(private route: ActivatedRoute, private userService: UserService) {
    this.currentStudent = JSON.parse(localStorage.getItem("currentUser"));
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if(params.has('id')){
        this.studentId = params.get('id');
      }

      if(this.studentId || this.currentStudent) {
        this.findAllCoursesOfStudent();
      }
    });
  }

  findAllCoursesOfStudent(){
    if(!this.studentId){
      this.studentId = this.currentStudent.id.toString();
    }
    this.userService.findAllCoursesOfStudent(this.studentId).subscribe(data => {
      this.courseList = data;
    });
  }

}
