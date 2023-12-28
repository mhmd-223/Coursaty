package com.example.coursaty.Controller;

import com.example.coursaty.Entitiy.Reply;
import com.example.coursaty.Entitiy.Response.CustomResponseEntity;
import com.example.coursaty.Entitiy.User.User;
import com.example.coursaty.Service.ReplyService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/reply")
public class ReplyController {

    private final ReplyService replyService;

    public ReplyController(ReplyService replyService) {
        this.replyService = replyService;
    }

    @GetMapping("/{id}")
    public CustomResponseEntity<?> getReplyById(@PathVariable long id){
        return replyService.getReplyById(id);
    }

    @PostMapping("/{postId}")
    public CustomResponseEntity<?> createReply(@RequestBody Reply reply, @PathVariable long postId){
        return replyService.createReply(reply, reply.getUser().getEmail(), postId);
    }
}
