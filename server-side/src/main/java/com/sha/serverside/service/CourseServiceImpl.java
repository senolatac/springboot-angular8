package com.sha.serverside.service;

import com.sha.serverside.model.Course;
import com.sha.serverside.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class CourseServiceImpl implements CourseService {

    @Autowired
    private CourseRepository courseRepository;

    @Override
    public Course addCourse(Course course){
        return courseRepository.save(course);
    }

    @Override
    public Course updateCourse(Course course){
        return courseRepository.save(course);
    }

    @Override
    public void deleteCourse(Long courseId){
        courseRepository.deleteById(courseId);
    }

    @Override
    public List<Course> findAllCourses(){
        return courseRepository.findAll();
    }
}
