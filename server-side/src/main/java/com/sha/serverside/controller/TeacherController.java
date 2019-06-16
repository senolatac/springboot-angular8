package com.sha.serverside.controller;

import com.sha.serverside.model.User;
import com.sha.serverside.service.CourseStudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class TeacherController {

    @Autowired
    private CourseStudentService courseStudentService;

    @GetMapping("/api/teacher/students/{teacherId}")
    public ResponseEntity<?> findAllStudentsOfInstructor(@PathVariable Long teacherId){
        List<User> students =
                courseStudentService.findAllStudentsOfInstructor(teacherId).stream()
                        .map(cs -> cs.getStudent())
                        .collect(Collectors.toList());
        return new ResponseEntity<>(students, HttpStatus.OK);
    }
}
