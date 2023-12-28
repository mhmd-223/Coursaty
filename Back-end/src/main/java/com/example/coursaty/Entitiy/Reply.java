package com.example.coursaty.Entitiy;

import com.example.coursaty.Entitiy.User.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
@Table(name = "replies")
public class Reply {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String content;
    private Timestamp date;

    @ManyToOne
    @JsonIncludeProperties({"image", "fullName", "email", "id"})
    private User user;

    @ManyToOne
    @JsonIgnore
    private Post post;

    public Reply() {
    }

    public Reply(long id, String content, Timestamp date, User user, Post post) {
        this.id = id;
        this.content = content;
        this.date = date;
        this.user = user;
        this.post = post;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
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

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }
}
