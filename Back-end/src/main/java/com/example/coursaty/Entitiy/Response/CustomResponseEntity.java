package com.example.coursaty.Entitiy.Response;

public class CustomResponseEntity<T> {

    private int code;
    private T data;
    private String message;

    public CustomResponseEntity(int code, T data, String message) {
        this.code = code;
        this.data = data;
        this.message = message;
    }

    public CustomResponseEntity(String message, T data, int code) {
        this.code = code;
        this.data = data;
        this.message = message;
    }

    public CustomResponseEntity(CustomResponseCode responseCode) {
        this.code = responseCode.getCode();
        this.message = responseCode.getMessage();
    }

    public CustomResponseEntity(CustomResponseCode responseCode, T data) {
        this.code = responseCode.getCode();
        this.message = responseCode.getMessage();
        this.data = data;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
