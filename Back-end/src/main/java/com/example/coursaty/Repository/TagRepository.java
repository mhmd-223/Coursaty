package com.example.coursaty.Repository;

import com.example.coursaty.Entitiy.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {
    Optional<Tag> findTagByTitle(String title);
}
