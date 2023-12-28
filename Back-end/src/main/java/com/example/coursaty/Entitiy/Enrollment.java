package com.example.coursaty.Entitiy;

import com.example.coursaty.Entitiy.User.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Objects;

@Entity
@Table(name = "enrollments")
@IdClass(Enrollment.EnrollmentId.class)
public class Enrollment {

    private Timestamp date;

    @ManyToOne
    @Id
    @JsonIgnore
    private User user;

    @ManyToOne
    @Id
    private Course course;

    public Enrollment() {
    }

    public Enrollment(Timestamp date, User user, Course course) {
        this.date = date;
        this.user = user;
        this.course = course;
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

    @Embeddable
    public static class EnrollmentId implements Serializable{

        private User user;
        private Course course;

        public EnrollmentId() {
        }

        public EnrollmentId(User user, Course course) {
            this.user = user;
            this.course = course;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            EnrollmentId that = (EnrollmentId) o;
            return Objects.equals(user, that.user) && Objects.equals(course, that.course);
        }

        @Override
        public int hashCode() {
            return Objects.hash(user, course);
        }
    }
}
