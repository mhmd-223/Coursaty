package com.example.coursaty.Entitiy;

import com.example.coursaty.Entitiy.User.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

@Entity
@Table(name = "courses")
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String title;
    private String brief;
    private String description;
    private String previewUrl;
    private String image;

    @Transient
    private long subscribers;

    @ManyToOne
    @JsonIgnoreProperties("courses")
    private User instructor;

    @OneToMany(mappedBy = "course")
    @JsonIgnoreProperties("course")
    private List<Module> modules;


    @OneToMany(mappedBy = "course")
    @JsonIgnore
    private List<Enrollment> enrollments;


    @Transient
    private List<Long> courseTags; // List of tag titles


    @OneToMany(mappedBy = "course")
//    @JsonIgnoreProperties("course")
    private List<CourseTag> tags;

    public List<CourseTag> getTags() {
        return tags;
    }

    public void setTags(List<CourseTag> tags) {
        this.tags = tags;
    }

    @OneToMany(mappedBy = "course")
    private List<Post> posts;

    public Course() {
    }

    public Course(long id, String title, String brief, String description, String previewUrl, String image, User instructor, List<Module> modules, List<Enrollment> enrollments, List<Post> posts) {
        this.id = id;
        this.title = title;
        this.brief = brief;
        this.description = description;
        this.previewUrl = previewUrl;
        this.image = image;
        this.instructor = instructor;
        this.modules = modules;
        this.enrollments = enrollments;
        this.posts = posts;
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

    public String getBrief() {
        return brief;
    }

    public void setBrief(String brief) {
        this.brief = brief;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPreviewUrl() {
        return previewUrl;
    }

    public void setPreviewUrl(String previewUrl) {
        this.previewUrl = previewUrl;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public User getInstructor() {
        return instructor;
    }

    public void setInstructor(User instructor) {
        this.instructor = instructor;
    }

    public List<Module> getModules() {
        return modules;
    }

    public void setModules(List<Module> modules) {
        this.modules = modules;
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


    public List<Long> getCourseTags() {
        return courseTags;
    }

    public void setCourseTags(List<Long> courseTags) {
        this.courseTags = courseTags;
    }

    public long getSubscribers() {
        return enrollments == null ? 0 : enrollments.size();
    }

    public void setSubscribers(long subscribers) {
        this.subscribers = subscribers;
    }

    @Override
    public String toString() {
        return "Course{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", brief='" + brief + '\'' +
                ", description='" + description + '\'' +
                ", previewUrl='" + previewUrl + '\'' +
                ", image='" + image + '\'' +
                ", instructor=" + instructor +
                ", modules=" + modules +
                ", enrollments=" + enrollments +
                ", courseTags=" + courseTags +
                ", posts=" + posts +
                '}';
    }
}
