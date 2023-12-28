package com.example.coursaty.Repository;

import com.example.coursaty.Entitiy.UserLesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserLessonRepository extends JpaRepository<UserLesson, UserLesson.UserLessonId> {

    @Query(value = "select * from user_lessons where user_id = ?1 and lesson_id = ?2", nativeQuery = true)
    UserLesson findByUserAndLessonId(long userId, long lessonId);
}
