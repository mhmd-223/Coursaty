package com.example.coursaty.Entitiy;

import com.example.coursaty.Entitiy.User.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import jakarta.persistence.*;

import java.sql.Timestamp;
import java.util.List;

@Entity
@Table(name = "posts")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String title;
    private String content;
    private Timestamp date;

    @ManyToOne
    @JsonIncludeProperties({"image", "email", "fullName", "id"})
    private User user;

    @ManyToOne
    @JsonIgnore
    private Course course;

    @OneToMany(mappedBy = "post")
    @JsonIgnoreProperties("post")
    private List<Reply> replies;

    public Post() {
    }

    public Post(long id, String title, String content, Timestamp date, User user, Course course, List<Reply> replies) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.date = date;
        this.user = user;
        this.course = course;
        this.replies = replies;
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

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Timestamp getDate() {
        return date;
    }

    public void setDate(Timestamp date) {
        this.date = date;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public List<Reply> getReplies() {
        return replies;
    }

    public void setReplies(List<Reply> replies) {
        this.replies = replies;
    }
}
