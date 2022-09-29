package com.jeffryjimenez.AuthorizationService.integration.service;

import com.jeffryjimenez.AuthorizationService.service.JwtTokenProvider;
import io.jsonwebtoken.Claims;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class JwtTokenProviderIntegrationTest {

    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @Autowired
    AuthenticationManager authenticationManager;

    @DisplayName("Generate a valid JWT token test")
    @Test
    public void generateTokenTest() {

        String bearer= "Bearer";

        Authentication authentication =
                authenticationManager
                        .authenticate(new UsernamePasswordAuthenticationToken("user1", "password"));


        String actual = jwtTokenProvider.generateToken(authentication);

        assertTrue(!actual.isEmpty());
        assertTrue(jwtTokenProvider.validateToken(actual));
    }

    @DisplayName("Get the correct claims (subject) from JWT token")
    @Test
    public void getClaimsFromJwtTest(){

        String username =  "user1";
        Authentication authentication =
                authenticationManager
                        .authenticate(new UsernamePasswordAuthenticationToken(username, "password"));


        String token = jwtTokenProvider.generateToken(authentication);
        Claims claims = jwtTokenProvider.getClaimsFromJWT(token);
        String subject = claims.getSubject();

        assertEquals(subject, username);
    }

    @DisplayName("Valid JWT token")
    @Test
    public void validateTokenValidTest(){

        String username =  "user1";
        Authentication authentication =
                authenticationManager
                        .authenticate(new UsernamePasswordAuthenticationToken(username, "password"));


        String token = jwtTokenProvider.generateToken(authentication);

        assertTrue(jwtTokenProvider.validateToken(token));

    }

    @DisplayName("Invalid (compromised) JWT token")
    @Test
    public void validateTokenInvalidTest(){


        String invalidToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJpbnZhbGlkIiwiYXV0aG9yaXRpZXMiOltdLCJpYXQiOjE2NjQ0NTkyNjIsImV4cCI6MTY2NDU0NTY2Mn0.CXgf61RUhvgk82dp7tlo2GDzuAqTGS3-K6y42uMkupGKgjEWf_7nN2CGlEJflFpy1WkV_cBTxl7mGfQEH2_gFA";

        assertFalse(jwtTokenProvider.validateToken(invalidToken));
    }

}
