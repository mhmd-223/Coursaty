package com.example.coursaty.Service;


import com.example.coursaty.Entitiy.Quiz;
import com.example.coursaty.Entitiy.Response.CustomResponseCode;
import com.example.coursaty.Entitiy.Response.CustomResponseEntity;
import com.example.coursaty.Entitiy.UserQuiz;
import com.example.coursaty.Repository.QuizRepository;
import com.example.coursaty.Repository.UserQuizRepository;
import org.springframework.stereotype.Service;

@Service
public class QuizService {
    public QuizRepository repository;
    public UserQuizRepository userQuizRepository;

    public QuizService(QuizRepository repository, UserQuizRepository userQuizRepository) {
        this.repository = repository;
        this.userQuizRepository = userQuizRepository;
    }

    public CustomResponseEntity<?> addQuiz(Quiz quiz) {
        return new CustomResponseEntity<>(CustomResponseCode.SUCCESS, repository.save(quiz));
    }
    public CustomResponseEntity<?> addUserQuiz(UserQuiz userQuiz) {
        userQuizRepository.save(userQuiz);
        return new CustomResponseEntity<>(CustomResponseCode.SUCCESS);
    }

}
