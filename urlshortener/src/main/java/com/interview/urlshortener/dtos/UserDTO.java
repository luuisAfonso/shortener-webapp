package com.interview.urlshortener.dtos;
import com.interview.urlshortener.entities.User;
import lombok.Data;

import java.time.LocalDate;

@Data
public class UserDTO {

    private Long id;
    private String name;
    private String email;
    private LocalDate lastLogin;
    private LocalDate creationDate;

    public UserDTO(User user) {
        this.id = user.getId();
        this.name = user.getName();
        this.email = user.getEmail();
        this.lastLogin = user.getLastLogin();
        this.creationDate = user.getCreationDate();
    }

}
