package com.example.coursaty.Exception;

import com.example.coursaty.Entitiy.Response.CustomResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class CustomizedExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(Exception.class)
    public final ResponseEntity<Object> handleAllExceptions(Exception ex, WebRequest request) {
        CustomResponseEntity<String> customResponseEntity = new CustomResponseEntity<>(ex.getMessage(), request.getDescription(false), 500);
        return new ResponseEntity<>(customResponseEntity, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
