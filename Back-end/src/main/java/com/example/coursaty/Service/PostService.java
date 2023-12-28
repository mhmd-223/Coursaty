package com.example.coursaty.Service;

import com.example.coursaty.Entitiy.Post;
import com.example.coursaty.Entitiy.Response.CustomResponseCode;
import com.example.coursaty.Entitiy.Response.CustomResponseEntity;
import com.example.coursaty.Repository.CourseRepository;
import com.example.coursaty.Repository.PostRepository;
import com.example.coursaty.Repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.Optional;

@Service
public class PostService {

    private PostRepository postRepository;
    private UserRepository userRepository;
    private CourseRepository courseRepository;

    public PostService(PostRepository postRepository, UserRepository userRepository, CourseRepository courseRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.courseRepository = courseRepository;
    }

    public CustomResponseEntity<?> getPostById(long id) {
        Optional<Post> post = postRepository.findById(id);
        if (post.isPresent()){
            return new CustomResponseEntity<>(CustomResponseCode.SUCCESS, post.get());
        }
        return new CustomResponseEntity<>(CustomResponseCode.FAIL);
    }

    public CustomResponseEntity<?> getPostReplies(long id) {
        Optional<Post> post = postRepository.findById(id);
        if (post.isPresent()){
            return new CustomResponseEntity<>(CustomResponseCode.SUCCESS, post.get().getReplies());
        }
        return new CustomResponseEntity<>(CustomResponseCode.FAIL);
    }

    @Transactional
    public CustomResponseEntity createPost(Post post, String email, long courseId) {
        post.setDate(new Timestamp(System.currentTimeMillis()));
        post.setUser(userRepository.findByEmail(email).get());
        post.setCourse(courseRepository.findById(courseId).get());
        postRepository.save(post);
        return new CustomResponseEntity(CustomResponseCode.SUCCESS);
    }
}
