package com.jeffryjimenez.OrdersService.utils;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Data
@Component
@NoArgsConstructor
public class JwtConfig {

    @Value("${security.jwt.uri}")
    private String uri;
    @Value("${security.jwt.header}")
    private String header;
    @Value("${security.jwt.prefix}")
    private String prefix;
    @Value("${security.jwt.expiration}")
    private int expiration;
    @Value("${security.jwt.secret}")
    private String secret;
}
