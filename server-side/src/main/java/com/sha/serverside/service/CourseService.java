package com.sha.serverside.service;

import com.sha.serverside.model.Course;

import java.util.List;

public interface CourseService {
    Course addCourse(Course course);

    Course updateCourse(Course course);

    void deleteCourse(Long courseId);

    List<Course> findAllCourses();
}
