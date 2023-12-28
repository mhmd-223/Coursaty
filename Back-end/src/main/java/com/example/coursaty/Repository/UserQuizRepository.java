package com.example.coursaty.Repository;

import com.example.coursaty.Entitiy.UserQuiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserQuizRepository extends JpaRepository<UserQuiz, UserQuiz.UserQuizId> {
}
