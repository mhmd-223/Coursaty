package com.example.coursaty.Repository;

import com.example.coursaty.Entitiy.CourseTag;
import com.example.coursaty.Entitiy.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseTagRepository extends JpaRepository<CourseTag , CourseTag.CourseTagId> {
    List<CourseTag> findCourseTagsByTag(Tag tag);
}
