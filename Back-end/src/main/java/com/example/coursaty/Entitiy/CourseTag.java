package com.example.coursaty.Entitiy;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "course_tags")
@IdClass(CourseTag.CourseTagId.class)
public class CourseTag {

    @ManyToOne
    @Id
    @JsonIgnore
    private Course course;

    @ManyToOne
    @Id
//    @JsonIgnoreProperties("courseTags")
    private Tag tag;

    public CourseTag() {
    }

    public CourseTag(Course course, Tag tag) {
        this.course = course;
        this.tag = tag;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public Tag getTag() {
        return tag;
    }

    public void setTag(Tag tag) {
        this.tag = tag;
    }

    @Embeddable
    public static class CourseTagId implements Serializable {

        private Course course;
        private Tag tag;

        public CourseTagId() {
        }

        public CourseTagId(Course course, Tag tag) {
            this.course = course;
            this.tag = tag;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            CourseTagId that = (CourseTagId) o;
            return Objects.equals(course, that.course) && Objects.equals(tag, that.tag);
        }

        @Override
        public int hashCode() {
            return Objects.hash(course, tag);
        }
    }
}
