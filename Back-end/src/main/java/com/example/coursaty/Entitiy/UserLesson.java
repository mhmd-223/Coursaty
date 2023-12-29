package com.example.coursaty.Entitiy;

import com.example.coursaty.Entitiy.User.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "user_lessons")
@IdClass(UserLesson.UserLessonId.class)
public class UserLesson {

    private boolean isFinished;

    @ManyToOne
    @Id
    @JsonIgnore
    private User user;

    @ManyToOne
    @Id
    @JsonIgnore
    private Lesson lesson;

    public UserLesson() {
    }

    public UserLesson(boolean isFinished, User user, Lesson lesson) {
        this.isFinished = isFinished;
        this.user = user;
        this.lesson = lesson;
    }

    public boolean isFinished() {
        return isFinished;
    }

    public void setFinished(boolean finished) {
        isFinished = finished;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Lesson getLesson() {
        return lesson;
    }

    public void setLesson(Lesson lesson) {
        this.lesson = lesson;
    }

    @Embeddable
    public static class UserLessonId implements Serializable {

        private User user;
        private Lesson lesson;

        public UserLessonId() {
        }

        public UserLessonId(User user, Lesson lesson) {
            this.user = user;
            this.lesson = lesson;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            UserLessonId that = (UserLessonId) o;
            return Objects.equals(user, that.user) && Objects.equals(lesson, that.lesson);
        }

        @Override
        public int hashCode() {
            return Objects.hash(user, lesson);
        }
    }
}

