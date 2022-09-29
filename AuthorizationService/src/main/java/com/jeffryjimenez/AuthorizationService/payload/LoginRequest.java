package com.jeffryjimenez.AuthorizationService.payload;

import lombok.Data;
import lombok.NonNull;

import javax.validation.constraints.NotBlank;

@Data
public class LoginRequest {



    @NotBlank
    private String username;
    @NotBlank
    private String password;

}
