package com.example.coursaty.Controller;

import com.example.coursaty.Entitiy.Post;
import com.example.coursaty.Entitiy.Response.CustomResponseEntity;
import com.example.coursaty.Entitiy.User.User;
import com.example.coursaty.Service.PostService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/post")
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping("/{id}")
    public CustomResponseEntity<?> getPostById(@PathVariable long id){
        return postService.getPostById(id);
    }

    @GetMapping("/{id}/reply")
    public CustomResponseEntity<?> getPostReplies(@PathVariable long id){
        return postService.getPostReplies(id);
    }

    @PostMapping("/{courseId}")
    public CustomResponseEntity createPost(@RequestBody Post post, @PathVariable long courseId){
        return postService.createPost(post, post.getUser().getEmail(), courseId);
    }
}
