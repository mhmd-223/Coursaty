package com.example.coursaty.Service;

import com.example.coursaty.Entitiy.Reply;
import com.example.coursaty.Entitiy.Response.CustomResponseCode;
import com.example.coursaty.Entitiy.Response.CustomResponseEntity;
import com.example.coursaty.Repository.PostRepository;
import com.example.coursaty.Repository.ReplyRepository;
import com.example.coursaty.Repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.Optional;

@Service
public class ReplyService {

    private final ReplyRepository replyRepository;
    private final UserRepository userRepository;
    private final PostRepository postRepository;

    public ReplyService(ReplyRepository replyRepository, UserRepository userRepository, PostRepository postRepository) {
        this.replyRepository = replyRepository;
        this.userRepository = userRepository;
        this.postRepository = postRepository;
    }

    public CustomResponseEntity<?> getReplyById(long id) {
        Optional<Reply> reply = replyRepository.findById(id);
        if(reply.isPresent()){
            return new CustomResponseEntity<>(CustomResponseCode.SUCCESS, reply.get());
        }
        return new CustomResponseEntity<>(CustomResponseCode.FAIL);
    }

    @Transactional
    public CustomResponseEntity<?> createReply(Reply reply, String email, long postId) {
        reply.setDate(new Timestamp(System.currentTimeMillis()));
        reply.setUser(userRepository.findByEmail(email).get());
        reply.setPost(postRepository.findById(postId).get());
        replyRepository.save(reply);
        return new CustomResponseEntity<>(CustomResponseCode.SUCCESS);
    }
}
