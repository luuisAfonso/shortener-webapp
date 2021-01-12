package com.interview.urlshortener.dtos;

import lombok.Data;

@Data
public class UserAuthenticationDTO {
    private String email;
    private String password;
}
