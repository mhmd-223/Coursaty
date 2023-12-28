package com.example.coursaty.Entitiy.User;

import com.example.coursaty.Entitiy.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String fullName;
    private String password;
    private String bio;
    private String image;
    private String email;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "enum")
    private Role role;

    @OneToMany(mappedBy = "instructor")
    @JsonIgnoreProperties({"instructor"})
    private List<Course> courses;

    @OneToMany(mappedBy = "user")
//    @JsonIgnoreProperties("user")
    private List<Enrollment> enrollments;

    @OneToMany(mappedBy = "user")
    private List<Post> posts;

    @OneToMany(mappedBy = "user")
    private List<UserLesson> userLesson;

    @OneToMany(mappedBy = "user")
    private List<Reply> replies;

    @OneToMany(mappedBy = "user")
    @JsonIgnoreProperties("user")
    private List<UserQuiz> userQuizzes;

    public User() {
    }

    public User(long id, String fullName, String password, String bio, String image, String email, Role role, List<Course> courses, List<Enrollment> enrollments, List<Post> posts) {
        this.id = id;
        this.fullName = fullName;
        this.password = password;
        this.bio = bio;
        this.image = image;
        this.email = email;
        this.role = role;
        this.courses = courses;
        this.enrollments = enrollments;
        this.posts = posts;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public List<Course> getCourses() {
        return courses;
    }

    public void setCourses(List<Course> courses) {
        this.courses = courses;
    }

    public List<Enrollment> getEnrollments() {
        return enrollments;
    }

    public void setEnrollments(List<Enrollment> enrollments) {
        this.enrollments = enrollments;
    }

    public List<Post> getPosts() {
        return posts;
    }

    public void setPosts(List<Post> posts) {
        this.posts = posts;
    }

    public List<UserLesson> getUserLesson() {
        return userLesson;
    }

    public void setUserLesson(List<UserLesson> userLesson) {
        this.userLesson = userLesson;
    }

    public List<Reply> getReplies() {
        return replies;
    }

    public void setReplies(List<Reply> replies) {
        this.replies = replies;
    }

    public List<UserQuiz> getUserQuizzes() {
        return userQuizzes;
    }

    public void setUserQuizzes(List<UserQuiz> userQuizzes) {
        this.userQuizzes = userQuizzes;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", fullName='" + fullName + '\'' +
                ", password='" + password + '\'' +
                ", bio='" + bio + '\'' +
                ", image='" + image + '\'' +
                ", email='" + email + '\'' +
                ", role=" + role +
                ", courses=" + courses +
                ", enrollments=" + enrollments +
                ", posts=" + posts +
                '}';
    }
}
