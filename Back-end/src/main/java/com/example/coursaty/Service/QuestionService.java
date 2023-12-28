package com.example.coursaty.Service;

import com.example.coursaty.Entitiy.Question;
import com.example.coursaty.Entitiy.Response.CustomResponseCode;
import com.example.coursaty.Entitiy.Response.CustomResponseEntity;
import com.example.coursaty.Repository.QuestionRepository;
import org.springframework.stereotype.Service;

@Service
public class QuestionService {

    private final QuestionRepository repository;

    public QuestionService(QuestionRepository repository) {
        this.repository = repository;
    }

    public CustomResponseEntity<?> addQuestion(Question question) {
        repository.save(question);
        return new CustomResponseEntity<>(CustomResponseCode.SUCCESS);
    }
}
