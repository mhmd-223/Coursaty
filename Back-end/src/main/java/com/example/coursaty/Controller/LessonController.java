package com.example.coursaty.Controller;

import com.example.coursaty.Entitiy.Lesson;
import com.example.coursaty.Entitiy.Response.CustomResponseEntity;
import com.example.coursaty.Service.LessonService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/lesson")
public class LessonController {

    private LessonService lessonService;

    public LessonController(LessonService lessonService) {
        this.lessonService = lessonService;
    }

    @PostMapping()
    public CustomResponseEntity<?> createLesson(@RequestBody Lesson lesson) {
        return lessonService.createLesson(lesson);
    }

    @GetMapping()
    public CustomResponseEntity<?> getLessons() {
        return lessonService.getAllLessons();
    }

    @GetMapping("{userId}/{lessonId}")
    public CustomResponseEntity<?> getUserLesson(@PathVariable long userId, @PathVariable long lessonId) {
        return lessonService.getUserLesson(userId, lessonId);
    }
    @PutMapping("{userId}/{lessonId}")
    public CustomResponseEntity<?> updateUserLesson(@PathVariable long userId, @PathVariable long lessonId) {
        return lessonService.toggleFinished(userId, lessonId);
    }
}
