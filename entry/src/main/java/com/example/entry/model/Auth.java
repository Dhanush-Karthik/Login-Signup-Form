package com.example.entry.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Auth {
    private String userName;

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Auth(@JsonProperty("userName") String userName) {
        this.userName = userName;
    }

}
