package com.example.coursaty.Controller;

import com.example.coursaty.Entitiy.Module;
import com.example.coursaty.Entitiy.Question;
import com.example.coursaty.Entitiy.Quiz;
import com.example.coursaty.Entitiy.Response.CustomResponseEntity;
import com.example.coursaty.Entitiy.UserQuiz;
import com.example.coursaty.Service.ModuleService;
import com.example.coursaty.Service.QuestionService;
import com.example.coursaty.Service.QuizService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/module")
public class ModuleController {

    private final ModuleService moduleService;
    private final QuizService quizService;
    private final QuestionService questionService;

    public ModuleController(ModuleService moduleService, QuizService quizService, QuestionService questionService) {
        this.moduleService = moduleService;
        this.quizService = quizService;
        this.questionService = questionService;
    }

    @GetMapping("/{id}")
    public CustomResponseEntity<?> getModule(@PathVariable long id){
        return moduleService.getModule(id);
    }

    @GetMapping("/{id}/lesson")
    public CustomResponseEntity<?> getModuleLessons(@PathVariable long id){
        return moduleService.getModuleLessons(id);
    }

    @PostMapping()
    public CustomResponseEntity<?> addModule(@RequestBody Module module) {
        return moduleService.addModule(module);
    }

    @PostMapping("/quiz")
    public CustomResponseEntity<?> addQuiz(@RequestBody Quiz quiz) {
        return quizService.addQuiz(quiz);
    }
   @PostMapping("/question")
    public CustomResponseEntity<?> addQuestion(@RequestBody Question question) {
        return questionService.addQuestion(question);
    }
    @PostMapping("/submitQuiz")
    public CustomResponseEntity<?> addUserQuiz(@RequestBody UserQuiz userQuiz) {
        return quizService.addUserQuiz(userQuiz);
    }

}
