package com.example.coursaty.Entitiy;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "modules")
public class Module {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String title;
    private String description;

    @ManyToOne
    @JsonIgnore
    private Course course;

    @OneToMany(mappedBy = "module")
    @JsonIgnoreProperties("module")
    private List<Lesson> lessons;

    @OneToOne(mappedBy = "module")
    private Quiz quiz;

    public Module() {
    }

    public Module(long id, String title, String description, Course course, List<Lesson> lessons, Quiz quiz) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.course = course;
        this.lessons = lessons;
        this.quiz = quiz;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public List<Lesson> getLessons() {
        return lessons;
    }

    public void setLessons(List<Lesson> lessons) {
        this.lessons = lessons;
    }

    public Quiz getQuiz() {
        return quiz;
    }

    public void setQuiz(Quiz quiz) {
        this.quiz = quiz;
    }
}
