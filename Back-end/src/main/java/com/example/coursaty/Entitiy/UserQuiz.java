package com.example.coursaty.Entitiy;

import com.example.coursaty.Entitiy.User.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "user_quizzes")
@IdClass(UserQuiz.UserQuizId.class)
public class UserQuiz {

    private int score;

    @ManyToOne
    @Id
    @JsonIncludeProperties("id")
    private User user;

    @ManyToOne
    @Id
    @JsonIncludeProperties("id")
    private Quiz quiz;

    public UserQuiz() {
    }

    public UserQuiz(int score, User user, Quiz quiz) {
        this.score = score;
        this.user = user;
        this.quiz = quiz;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Quiz getQuiz() {
        return quiz;
    }

    public void setQuiz(Quiz quiz) {
        this.quiz = quiz;
    }

    @Embeddable
    public static class UserQuizId implements Serializable {

        private User user;
        private Quiz quiz;

        public UserQuizId() {
        }

        public UserQuizId(User user, Quiz quiz) {
            this.user = user;
            this.quiz = quiz;
        }

        public User getUser() {
            return user;
        }

        public void setUser(User user) {
            this.user = user;
        }

        public Quiz getQuiz() {
            return quiz;
        }

        public void setQuiz(Quiz quiz) {
            this.quiz = quiz;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            UserQuizId that = (UserQuizId) o;
            return Objects.equals(user, that.user) && Objects.equals(quiz, that.quiz);
        }

        @Override
        public int hashCode() {
            return Objects.hash(user, quiz);
        }
    }
}
