package com.example.coursaty.Mail;

import org.springframework.context.ApplicationEvent;

public class MailEvent extends ApplicationEvent {

  private String email;
  private String otp;
  private String subject;

  public MailEvent(Object source, String email, String otp, String subject) {
    super(source);
    this.email = email;
    this.otp = otp;
    this.subject = subject;
  }

  public String getEmail() {
    return email;
  }

  public String getOtp() {
    return otp;
  }

  public String getSubject() {
    return subject;
  }
}
