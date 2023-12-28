package com.example.coursaty.Entitiy.Response;

public enum CustomResponseCode {

    SUCCESS(200,"Success"),
    FAIL(550, "Fail"),
    WRONG_CREDENTIALS(555, "Wrong credentials");

    private int code;
    private String message;

    CustomResponseCode(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
