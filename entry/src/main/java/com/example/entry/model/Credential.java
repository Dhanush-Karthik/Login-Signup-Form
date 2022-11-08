package com.example.entry.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Credential {

    private String userName;
    private String password;

    public String getUserName() {
        return userName;
    }
    public void setUserName(String userName) {
        this.userName = userName;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    public Credential(@JsonProperty("userName") String userName,@JsonProperty("password") String password) {
        this.userName = userName;
        this.password = password;
    }

    public Credential() {
    }

    @Override
    public String toString() {
        return "Credential [userName=" + userName + ", password=" + password + "]";
    }
}
