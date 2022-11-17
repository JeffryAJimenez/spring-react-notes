package com.jeffryjimenez.AuthorizationService.payload;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class UpdateUserFieldRequest {

    @NotBlank
    @NotNull
    private String value;

    private String password;

}
