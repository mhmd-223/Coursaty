package com.example.coursaty.Controller;

import com.example.coursaty.Entitiy.Response.CustomResponseEntity;
import com.example.coursaty.Entitiy.User.User;
import com.example.coursaty.Service.EnrollmentService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/enrollment")
public class EnrollmentController {

    private final EnrollmentService enrollmentService;

    public EnrollmentController(EnrollmentService enrollmentService) {
        this.enrollmentService = enrollmentService;
    }

    @GetMapping("/{id}")
    public CustomResponseEntity<?> getEnrollment(@PathVariable long id, @RequestBody User user){
        return enrollmentService.getEnrollmentById(id, user.getEmail());
    }

    @GetMapping("")
    public CustomResponseEntity<?> getAllEnrollments(){
        return enrollmentService.getAllEnrollments();
    }

    @GetMapping("/info")
    public CustomResponseEntity<?> getUserEnrollments(@RequestBody User user){
        return enrollmentService.getUserEnrollments(user.getEmail());
    }

    @PostMapping("/{courseId}")
    public CustomResponseEntity<?> createEnrollment(@PathVariable long courseId, @RequestBody User user){
        return enrollmentService.createEnrollment(courseId, user.getId());
    }
}
