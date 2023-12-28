package com.example.coursaty.Service;

import com.example.coursaty.Entitiy.Course;
import com.example.coursaty.Entitiy.Lesson;
import com.example.coursaty.Entitiy.Module;
import com.example.coursaty.Entitiy.Response.CustomResponseCode;
import com.example.coursaty.Entitiy.Response.CustomResponseEntity;
import com.example.coursaty.Entitiy.User.User;
import com.example.coursaty.Entitiy.UserLesson;
import com.example.coursaty.Repository.CourseRepository;
import com.example.coursaty.Repository.LessonRepository;
import com.example.coursaty.Repository.UserLessonRepository;
import com.example.coursaty.Repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final LessonRepository lessonRepository;
    private final UserLessonRepository userLessonRepository;
    private PasswordService passwordService = new PasswordService();

    public UserService(UserRepository userRepository, CourseRepository courseRepository, LessonRepository lessonRepository, UserLessonRepository userLessonRepository) {
        this.userRepository = userRepository;
        this.courseRepository = courseRepository;
        this.lessonRepository = lessonRepository;
        this.userLessonRepository = userLessonRepository;
    }

    public CustomResponseEntity<?> authenticateUser(User user) {
        Optional<User> user1 = userRepository.findByEmail(user.getEmail());
        if (user1.isPresent()) {
            if (passwordService.authenticatePassword(user.getPassword(), user1.get().getPassword())) {
                user1.get().setPassword(null);
                return new CustomResponseEntity<>(CustomResponseCode.SUCCESS, user1.get());
            }
            return new CustomResponseEntity<>(CustomResponseCode.WRONG_CREDENTIALS);
        }
        return new CustomResponseEntity<>(CustomResponseCode.WRONG_CREDENTIALS);
    }

    public CustomResponseEntity<?> createUser(User user) {
        user.setPassword(passwordService.encodePassword(user.getPassword()));
        System.out.println(user);
        userRepository.save(user);
        return new CustomResponseEntity<>(CustomResponseCode.SUCCESS, user);
    }

    public CustomResponseEntity<?> checkUserProgress(long courseId, long userId) {
        Optional<User> user = userRepository.findById(userId);                                      //get user
        Optional<Course> course = courseRepository.findById(courseId);                              //get course
        double progress = 0.0;
        int lessonCount = 0;
        if (user.isPresent()) {
            if (course.isPresent()) {
                for (Module module : course.get().getModules()) {                                     //loop on course modules
                    for (Lesson lesson : module.getLessons()) {                                       //loop on module lessons
                        var checkedLesson = userLessonRepository.findById(new UserLesson.UserLessonId(user.get(), lesson));
                        lessonCount++;
                        if (checkedLesson.get().isFinished()) {
                            progress++;
                        }
                    }
                }
                progress = (progress / lessonCount) * 100;                                               //count progress percentage
                return new CustomResponseEntity<>(CustomResponseCode.SUCCESS, progress);
            }
            return new CustomResponseEntity<>(CustomResponseCode.FAIL);
        }
        return new CustomResponseEntity<>(CustomResponseCode.FAIL);
    }

    public CustomResponseEntity<User> getUserById(long userId) {
        return new CustomResponseEntity<>(CustomResponseCode.SUCCESS, this.userRepository.findById(userId).orElse(null));
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow();
    }

    public void updatePassword(User user, String pass) {
        if (pass != null) {
            user.setPassword(passwordService.encodePassword(pass));
            userRepository.save(user);
        }
    }

    public void updateUser(User user) {
        var existingUser = getUserById(user.getId()).getData();
        if (existingUser != null) {
            if (user.getEmail() != null)
                existingUser.setEmail(user.getEmail());
            if (user.getFullName() != null)
                existingUser.setFullName(user.getFullName());
            if (user.getBio() != null)
                existingUser.setBio(user.getBio());
            if (user.getImage() != null)
                existingUser.setImage(user.getImage());
            userRepository.save(existingUser);
        }
    }
}
