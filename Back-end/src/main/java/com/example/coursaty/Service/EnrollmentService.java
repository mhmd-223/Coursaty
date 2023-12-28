package com.example.coursaty.Service;

import com.example.coursaty.Entitiy.Course;
import com.example.coursaty.Entitiy.Enrollment;
import com.example.coursaty.Entitiy.Response.CustomResponseCode;
import com.example.coursaty.Entitiy.Response.CustomResponseEntity;
import com.example.coursaty.Entitiy.User.User;
import com.example.coursaty.Entitiy.UserLesson;
import com.example.coursaty.Repository.CourseRepository;
import com.example.coursaty.Repository.EnrollmentRepository;
import com.example.coursaty.Repository.UserLessonRepository;
import com.example.coursaty.Repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.Optional;

@Service
public class EnrollmentService {

    private EnrollmentRepository enrollmentRepository;
    private UserRepository userRepository;
    private CourseRepository courseRepository;

    private UserLessonRepository userLessonRepository;

    public EnrollmentService(EnrollmentRepository enrollmentRepository, UserRepository userRepository, CourseRepository courseRepository, UserLessonRepository userLessonRepository) {
        this.enrollmentRepository = enrollmentRepository;
        this.userRepository = userRepository;
        this.courseRepository = courseRepository;
        this.userLessonRepository = userLessonRepository;
    }

    public CustomResponseEntity<?> getUserEnrollments(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent()) {
            return new CustomResponseEntity<>(CustomResponseCode.SUCCESS, user.get().getEnrollments());
        }
        return new CustomResponseEntity<>(CustomResponseCode.FAIL);
    }

    public CustomResponseEntity<?> getEnrollmentById(long id, String email) {
        Optional<User> user = userRepository.findByEmail(email);                                    //get user
        if (user.isPresent()) {
            Optional<Course> course = courseRepository.findById(id);                                //get course
            if (course.isPresent()) {
                Optional<Enrollment> enrollment = enrollmentRepository.findById(new Enrollment.EnrollmentId(user.get(), course.get()));     //find enrollment
                return new CustomResponseEntity<>(CustomResponseCode.SUCCESS, enrollment.get());
            }
            return new CustomResponseEntity<>(CustomResponseCode.FAIL);
        }
        return new CustomResponseEntity<>(CustomResponseCode.FAIL);

    }

    public CustomResponseEntity<?> getAllEnrollments() {
        return new CustomResponseEntity<>(CustomResponseCode.SUCCESS, enrollmentRepository.findAll());
    }

    @Transactional
    public CustomResponseEntity<?> createEnrollment(long courseId, long userId) {
        Course course = courseRepository.findById(courseId).get();
        User user = userRepository.findById(userId).get();
        Enrollment enrollment = new Enrollment(new Timestamp(System.currentTimeMillis()), user, course);
        enrollmentRepository.save(enrollment);
        course.getModules().forEach(
                module -> module.getLessons().forEach(lesson -> userLessonRepository.save(
                        new UserLesson(false, user, lesson)
                ))
        );

        return new CustomResponseEntity<>(CustomResponseCode.SUCCESS);
    }
}
