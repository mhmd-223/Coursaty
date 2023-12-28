package com.example.coursaty.Controller;

import com.example.coursaty.Entitiy.Course;
import com.example.coursaty.Entitiy.Response.CustomResponseEntity;
import com.example.coursaty.Service.CourseService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/course")
public class CourseController {

    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @GetMapping("/{id}")
    public CustomResponseEntity<?> getCourse(@PathVariable long id) {
        return courseService.getCourseById(id);
    }

    @GetMapping("")
    public CustomResponseEntity<?> getAllCourses() {
        return courseService.getAllCourses();
    }

    @GetMapping("/tag/{tag}")
    public CustomResponseEntity<?> getCoursesByTag(@PathVariable long tag) {
        return courseService.getCoursesByTag(tag);
    }

    @GetMapping("/tags")
    public CustomResponseEntity<?> getTags() {
        return courseService.getTags();
    }

    @PostMapping("")
    public CustomResponseEntity<?> createCourse(@RequestBody Course course) {
        return courseService.createCourse(course);
    }

    @PutMapping("{id}")
    public CustomResponseEntity<?> updateCourse(@RequestBody Course course, @PathVariable long id) {
        return courseService.updateCourse(course, id);
    }
}
