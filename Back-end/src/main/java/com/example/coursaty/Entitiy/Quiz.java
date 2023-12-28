package com.example.coursaty.Entitiy;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "quizzes")
public class Quiz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String title;

    @OneToOne
    @JsonIgnoreProperties("quiz")
    private Module module;

    @OneToMany(mappedBy = "quiz")
    @JsonIgnoreProperties("quiz")
    private List<Question> questions;

    @OneToMany(mappedBy = "quiz")
    @JsonIgnoreProperties("quiz")
    private List<UserQuiz> userQuizzes;

    public Quiz() {
    }

    public Quiz(long id, String title, Module module, List<Question> questions) {
        this.id = id;
        this.title = title;
        this.module = module;
        this.questions = questions;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Module getModule() {
        return module;
    }

    public void setModule(Module module) {
        this.module = module;
    }

    public List<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(List<Question> questions) {
        this.questions = questions;
    }

    public List<UserQuiz> getUserQuizzes() {
        return userQuizzes;
    }

    public void setUserQuizzes(List<UserQuiz> userQuizzes) {
        this.userQuizzes = userQuizzes;
    }
}
