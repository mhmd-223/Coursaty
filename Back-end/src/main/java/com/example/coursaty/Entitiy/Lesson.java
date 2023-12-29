package com.example.coursaty.Entitiy;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "lessons")
@JsonIgnoreProperties({"userLesson"})
public class Lesson {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String title;
    private String url;

    @ManyToOne
    private Module module;

    @OneToMany(mappedBy = "lesson")
    private List<UserLesson> userLesson;


    public Lesson() {
    }

    public Lesson(long id, String title, String url, Module module) {
        this.id = id;
        this.title = title;
        this.url = url;
        this.module = module;
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

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Module getModule() {
        return module;
    }

    public void setModule(Module module) {
        this.module = module;
    }

    public List<UserLesson> getUserLesson() {
        return userLesson;
    }

    public void setUserLesson(List<UserLesson> userLesson) {
        this.userLesson = userLesson;
    }


    @Override
    public String toString() {
        return "Lesson{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", url='" + url + '\'' +
                ", module=" + module +
                ", userLesson=" + userLesson +
                '}';
    }
}
