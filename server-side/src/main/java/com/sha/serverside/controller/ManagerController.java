package com.sha.serverside.controller;

import com.sha.serverside.service.CourseStudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ManagerController {

    @Autowired
    private CourseStudentService courseStudentService;

    @GetMapping("/api/manager/enrollments")
    public ResponseEntity<?> findAllEnrollments(){
        return ResponseEntity.ok(courseStudentService.findAllEnrollments());
    }
}
