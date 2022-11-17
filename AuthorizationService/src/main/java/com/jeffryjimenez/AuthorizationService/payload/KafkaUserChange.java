package com.jeffryjimenez.AuthorizationService.payload;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class KafkaUserChange {

    private String oldUser;
    private String newUser;

}
