package com.example.coursaty.Entitiy;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "tags")
public class Tag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String title;

    @OneToMany(mappedBy = "tag")
    @JsonIgnore
    private List<CourseTag> courseTags;

    public Tag() {
    }

    public Tag(long id, String title, List<CourseTag> courseTags) {
        this.id = id;
        this.title = title;
        this.courseTags = courseTags;
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

    public List<CourseTag> getCourseTags() {
        return courseTags;
    }

    public void setCourseTags(List<CourseTag> courseTags) {
        this.courseTags = courseTags;
    }
}
