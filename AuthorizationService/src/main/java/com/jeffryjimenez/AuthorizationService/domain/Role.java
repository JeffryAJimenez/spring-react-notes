package com.jeffryjimenez.AuthorizationService.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Role {

    private String name;

    public static Role USER = new Role("USER");
    public static Role SERVICE = new Role("SERVICE");
}
