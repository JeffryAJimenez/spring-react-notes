package com.jeffryjimenez.AuthorizationService.payload;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserSummary {

    private Long id;
    private String username;
    private String fullName;
    private String email;

}
