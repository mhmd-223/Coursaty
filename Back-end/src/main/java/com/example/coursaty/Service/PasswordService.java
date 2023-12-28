package com.example.coursaty.Service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class PasswordService {

    public String encodePassword(String password) {
        try {
            // Create a MessageDigest with SHA-256 algorithm
            MessageDigest md = MessageDigest.getInstance("SHA-256");

            // Update the digest with the password bytes
            md.update(password.getBytes());

            // Get the hash bytes
            byte[] hashBytes = md.digest();

            // Convert the hash bytes to a hexadecimal string
            StringBuilder hexStringBuilder = new StringBuilder();
            for (byte hashByte : hashBytes) {
                hexStringBuilder.append(String.format("%02x", hashByte));
            }

            return hexStringBuilder.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Error encoding password", e);
        }
    }

    public boolean authenticatePassword(String enteredPassword, String hashedPassword) {
        // Hash the entered password using the same algorithm and compare with the stored hashed password
        String enteredHashedPassword = encodePassword(enteredPassword);
        return enteredHashedPassword.equals(hashedPassword);
    }
}
