package com.example.coursaty.Controller;

import com.example.coursaty.Entitiy.Response.CustomResponseCode;
import com.example.coursaty.Entitiy.Response.CustomResponseEntity;
import com.example.coursaty.Entitiy.User.User;
import com.example.coursaty.Service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.swing.*;
import java.util.Scanner;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public CustomResponseEntity<?> registerUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    @PostMapping("/login")
    public CustomResponseEntity<?> authenticateUser(@RequestBody User user) {
        return userService.authenticateUser(user);
    }

    @GetMapping("{userId}/progress/{courseId}")
    public CustomResponseEntity<?> checkUserProgress(@PathVariable long courseId, @PathVariable long userId) {
        return userService.checkUserProgress(courseId, userId);
    }

    @GetMapping("/{id}")
    public CustomResponseEntity<User> getUser(@PathVariable long id) {
        return userService.getUserById(id);
    }


    @PutMapping("/update")
    public void updateUser(@RequestBody User user) {
        userService.updateUser(user);
    }

    @GetMapping("recover/{email}")
    public void recoverAcc(@PathVariable String email) {
        try {
            var user = userService.getUserByEmail(email);
            String msg = """
                    Good Day, %s
                                    
                    You requested to recover your account.
                    Enter the new password
                    """.formatted(user.getFullName());

            // Simulate user input for the new password
            var scanner = new Scanner(System.in);
            System.out.println(msg);
            var newPassword = scanner.nextLine();

            // Update the password (simulate the actual update logic)
            userService.updatePassword(user, newPassword);
        } catch (Exception ignored) {
        }
    }

    @GetMapping("email/{email}")
    public CustomResponseEntity<?> getUserByEmail(@PathVariable String email) {
        try {
            return new CustomResponseEntity<>(CustomResponseCode.SUCCESS, userService.getUserByEmail(email));
        } catch (Exception e) {
            return new CustomResponseEntity<>(CustomResponseCode.FAIL);
        }
    }
}
