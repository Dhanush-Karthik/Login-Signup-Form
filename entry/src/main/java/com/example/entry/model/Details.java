package com.example.entry.model;

import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table
public class Details {

    @Id
    @SequenceGenerator(
        name = "signingenerator",
        sequenceName = "signingenerator",
        allocationSize = 1
    )

    @GenericGenerator(
        name="signingenerator",
        strategy = "uuid"
    )
    
    private UUID id;
    private String userName;
    private String email;
    private String password;
    private String confirmPassword;

    public UUID getId() {
        return id;
    }
    public void setId(UUID id) {
        this.id = id;
    }
    public String getUserName() {
        return userName;
    }
    public void setUserName(String userName) {
        this.userName = userName;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public String getConfirmPassword() {
        return confirmPassword;
    }
    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }
    public Details() {
    }

    public Details( 
        @JsonProperty("userName") String userName, 
        @JsonProperty("email") String email, 
        @JsonProperty("password") String password,
        @JsonProperty("confirmPassword") String confirmPassword) 
    {
        this.id = UUID.randomUUID();
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
    }
    
    @Override
    public String toString() {
        return "Details [id=" + id + ", userName=" + userName + ", email=" + email + ", password=" + password
                + ", confirmPassword=" + confirmPassword + "]";
    }

}
