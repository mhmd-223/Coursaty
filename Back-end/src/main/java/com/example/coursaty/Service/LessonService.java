package com.example.coursaty.Service;

import com.example.coursaty.Entitiy.Lesson;
import com.example.coursaty.Entitiy.Response.CustomResponseCode;
import com.example.coursaty.Entitiy.Response.CustomResponseEntity;
import com.example.coursaty.Entitiy.UserLesson;
import com.example.coursaty.Repository.LessonRepository;
import com.example.coursaty.Repository.UserLessonRepository;
import org.springframework.stereotype.Service;

@Service
public class LessonService {
    private LessonRepository lessonRepository;
    private UserLessonRepository userLessonRepository;
    private UserService userService;

    public LessonService(LessonRepository lessonRepository, UserLessonRepository userLessonRepository, UserService userService) {
        this.lessonRepository = lessonRepository;
        this.userLessonRepository = userLessonRepository;
        this.userService = userService;
    }

    public CustomResponseEntity<?> createLesson(Lesson lesson) {
        return new CustomResponseEntity<>(CustomResponseCode.SUCCESS, lessonRepository.save(lesson));
    }


    public CustomResponseEntity<?> getAllLessons() {
        return new CustomResponseEntity<>(CustomResponseCode.SUCCESS, lessonRepository.findAll());
    }

    public CustomResponseEntity<?> getUserLesson(long userId, long lessonId) {
        return new CustomResponseEntity<>(CustomResponseCode.SUCCESS, userLessonRepository.findByUserAndLessonId(userId, lessonId));
    }

    public CustomResponseEntity<?> toggleFinished(long userId, long lessonId) {
        var userLesson = userLessonRepository.findByUserAndLessonId(userId, lessonId);
        userLesson.setFinished(!userLesson.isFinished());
        userLessonRepository.save(userLesson);
        return new CustomResponseEntity<>(CustomResponseCode.SUCCESS);
    }
}
