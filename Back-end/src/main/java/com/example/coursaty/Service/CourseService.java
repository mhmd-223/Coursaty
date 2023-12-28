package com.example.coursaty.Service;

import com.example.coursaty.Entitiy.Course;
import com.example.coursaty.Entitiy.CourseTag;
import com.example.coursaty.Entitiy.Response.CustomResponseCode;
import com.example.coursaty.Entitiy.Response.CustomResponseEntity;
import com.example.coursaty.Entitiy.Tag;
import com.example.coursaty.Repository.CourseRepository;
import com.example.coursaty.Repository.CourseTagRepository;
import com.example.coursaty.Repository.TagRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CourseService {

    private CourseRepository courseRepository;
    private TagRepository tagRepository;
    private CourseTagRepository courseTagRepository;

    public CourseService(CourseRepository courseRepository, TagRepository tagRepository, CourseTagRepository courseTagRepository) {
        this.courseRepository = courseRepository;
        this.tagRepository = tagRepository;
        this.courseTagRepository = courseTagRepository;
    }

    public CustomResponseEntity<?> getCourseById(long id) {
        Optional<Course> course = courseRepository.findById(id);
        if (course.isPresent()) {
            return new CustomResponseEntity<>(CustomResponseCode.SUCCESS, course.get());
        }
        return new CustomResponseEntity<>(CustomResponseCode.FAIL);
    }

    public CustomResponseEntity<?> getAllCourses() {
        return new CustomResponseEntity<>(CustomResponseCode.SUCCESS, courseRepository.findAll());
    }

    public CustomResponseEntity<?> getCoursesByTag(long tagId) {
        Optional<Tag> tag1 = tagRepository.findById(tagId);                                          //get tag by name
        if (tag1.isPresent()) {
            List<CourseTag> courseTags = courseTagRepository.findCourseTagsByTag(tag1.get());            //get all courses with this tag
            List<Course> courses = new ArrayList<Course>();
            for (CourseTag coursetag : courseTags) {
                Optional<Course> course = courseRepository.findById(coursetag.getCourse().getId());
                courses.add(course.get());                                                              //push these courses into a list
            }
            return new CustomResponseEntity<>(CustomResponseCode.SUCCESS, courses);
        }
        return new CustomResponseEntity<>(CustomResponseCode.FAIL);
    }

    public CustomResponseEntity<?> getCourseModules(long id) {
        Optional<Course> course = courseRepository.findById(id);
        if (course.isPresent()) {
            return new CustomResponseEntity<>(CustomResponseCode.SUCCESS, course.get().getModules());
        }
        return new CustomResponseEntity<>(CustomResponseCode.FAIL);
    }

    public CustomResponseEntity<?> getCoursePosts(long id) {
        Optional<Course> course = courseRepository.findById(id);
        if (course.isPresent()) {
            return new CustomResponseEntity<>(CustomResponseCode.SUCCESS, course.get().getPosts());
        }
        return new CustomResponseEntity<>(CustomResponseCode.FAIL);
    }

    @Transactional
    public CustomResponseEntity<?> createCourse(Course course) {
        var createdCourse = courseRepository.save(course);
        createdCourse.getCourseTags().forEach(
                tagId -> courseTagRepository.save(
                        new CourseTag(createdCourse, tagRepository.findById(tagId).orElse(null))
                )
        );
        return new CustomResponseEntity<>(CustomResponseCode.SUCCESS, createdCourse);
    }

    @Transactional
    public CustomResponseEntity<?> updateCourse(Course course, long id) {
        Optional<Course> course1 = courseRepository.findById(id);           //check that course exist
        if (course1.isPresent()) {
            if (course.getBrief() == null) {                                              //check which attributes changed
                course.setBrief(course1.get().getBrief());
            }
            if (course.getDescription() == null) {
                course.setDescription(course1.get().getDescription());
            }
            if (course.getImage() == null) {
                course.setImage(course1.get().getImage());
            }
            if (course.getTitle() == null) {
                course.setTitle(course1.get().getTitle());
            }
            if (course.getPreviewUrl() == null) {
                course.setPreviewUrl(course1.get().getPreviewUrl());
            }
            courseRepository.save(course);                                              //update course
            return new CustomResponseEntity<>(CustomResponseCode.SUCCESS);
        }
        return new CustomResponseEntity<>(CustomResponseCode.FAIL);
    }

    public CustomResponseEntity<?> getTags() {
        return new CustomResponseEntity<>(CustomResponseCode.SUCCESS, tagRepository.findAll());
    }
}
