package com.jeffryjimenez.AuthorizationService.integration.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.jeffryjimenez.AuthorizationService.payload.LoginRequest;
import com.jeffryjimenez.AuthorizationService.service.JwtTokenProvider;
import org.junit.BeforeClass;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

@SpringBootTest
@AutoConfigureMockMvc
public class UserControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @Autowired
    AuthenticationManager authenticationManager;

    String token = "";


    @BeforeEach
    public void setUp(){
        Authentication authentication =
                authenticationManager
                        .authenticate(new UsernamePasswordAuthenticationToken("user1", "password"));


        this.token = jwtTokenProvider.generateToken(authentication);
    }

    @Test
    public void testGetAllUsers() throws Exception{

        this.mockMvc
                .perform(get("/users")
                        .header("authorization", "Bearer " + this.token)
                )
                .andExpect(status().isOk());
    }

    @Test
    public void testGetCurrentUser() throws Exception {

        this.mockMvc
                .perform(get("/users/me")
                        .header("authorization", "Bearer " + this.token))
                .andExpect(status().isOk())
                .andExpect(content().json("{'username':  'user1'}"));

    }

    @Test
    public void testGetCurrentUser_401_INVALID_TOKEN() throws Exception {

        String invalidToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJpbnZhbGlkIiwiYXV0aG9yaXRpZXMiOltdLCJpYXQiOjE2NjQ0NTkyNjIsImV4cCI6MTY2NDU0NTY2Mn0.CXgf61RUhvgk82dp7tlo2GDzuAqTGS3-K6y42uMkupGKgjEWf_7nN2CGlEJflFpy1WkV_cBTxl7mGfQEH2_gFA";

        this.mockMvc
                .perform(get("/users/me")
                        .header("authorization", "Bearer " + invalidToken ))
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void testGetCurrentUser_401_NO_TOKEN() throws Exception {

        this.mockMvc
                .perform(get("/users/me"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void testGetUserByUsername_OK() throws Exception{

        this.mockMvc
                .perform(get("/users/admin1")
                        .header("authorization", "Bearer " + this.token))
                .andExpect(status().isOk())
                .andExpect(content().json("{'email': 'admin1@email.com'}"));
    }

    @Test
    public void testGetUserByUsername_NOT_FOUND() throws Exception{

        this.mockMvc
                .perform(get("/users/user")
                        .header("authorization", "Bearer " + this.token))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetUserByUsername_400_INVALID_TOKEN() throws Exception{

        String invalidToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJpbnZhbGlkIiwiYXV0aG9yaXRpZXMiOltdLCJpYXQiOjE2NjQ0NTkyNjIsImV4cCI6MTY2NDU0NTY2Mn0.CXgf61RUhvgk82dp7tlo2GDzuAqTGS3-K6y42uMkupGKgjEWf_7nN2CGlEJflFpy1WkV_cBTxl7mGfQEH2_gFA";

        this.mockMvc
                .perform(get("/users/admin1")
                        .header("authorization", "Bearer " + invalidToken))
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void testGetUserByUsername_NO_TOKEN() throws Exception {

        this.mockMvc
                .perform(get("/users/admin1"))
                .andExpect(status().isUnauthorized());

    }

    @Test
    public void testGetUserSummaryByUsername_OK() throws Exception{

        this.mockMvc
                .perform(get("/users/summary/admin1")
                        .header("authorization", "Bearer " + this.token))
                .andExpect(status().isOk())
                .andExpect(content().json("{'username': 'admin1'}"));
    }

    @Test
    public void testGetUserSummaryByUsername_NOT_FOUND() throws Exception{

        this.mockMvc
                .perform(get("/users/summary/user")
                        .header("authorization", "Bearer " + this.token))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetUserSummaryByUsername_400_INVALID_TOKEN() throws Exception{

        String invalidToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJpbnZhbGlkIiwiYXV0aG9yaXRpZXMiOltdLCJpYXQiOjE2NjQ0NTkyNjIsImV4cCI6MTY2NDU0NTY2Mn0.CXgf61RUhvgk82dp7tlo2GDzuAqTGS3-K6y42uMkupGKgjEWf_7nN2CGlEJflFpy1WkV_cBTxl7mGfQEH2_gFA";

        this.mockMvc
                .perform(get("/users/summary/admin1")
                        .header("authorization", "Bearer " + invalidToken))
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void testGetUserSummaryByUsername_NO_TOKEN() throws Exception {

        this.mockMvc
                .perform(get("/users/summary/admin1"))
                .andExpect(status().isUnauthorized());

    }

    @Test
    public void testGetAllUsersSummary_OK() throws Exception {

        this.mockMvc
                .perform(get("/users/summary")
                        .header("authorization", "Bearer " + this.token))
                .andExpect(status().isOk());

    }

    @Test
    public void testGetAllUsersSummary_INVALID_TOKEN() throws Exception {

        String invalidToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJpbnZhbGlkIiwiYXV0aG9yaXRpZXMiOltdLCJpYXQiOjE2NjQ0NTkyNjIsImV4cCI6MTY2NDU0NTY2Mn0.CXgf61RUhvgk82dp7tlo2GDzuAqTGS3-K6y42uMkupGKgjEWf_7nN2CGlEJflFpy1WkV_cBTxl7mGfQEH2_gFA";

        this.mockMvc
                .perform(get("/users/summary")
                        .header("authorization", "Bearer " + invalidToken))
                .andExpect(status().isUnauthorized());

    }

    @Test
    public void testGetAllUsersSummary_NO_TOKEN() throws Exception {


        this.mockMvc
                .perform(get("/users/summary"))
                .andExpect(status().isUnauthorized());

    }




    @Test
    public void testLogin() throws Exception{

        LoginRequest obj = new LoginRequest();
        obj.setUsername("user1");
        obj.setPassword("password");

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
        ObjectWriter ow = objectMapper.writer().withDefaultPrettyPrinter();
        String requestJson =  ow.writeValueAsString(obj);

        this.mockMvc
                .perform(post("/login")
                        .content(requestJson)
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(content().json("{'tokenType': 'Bearer'}"));
    }


    @Test
    public void testLogin_401() throws Exception{

        LoginRequest obj = new LoginRequest();
        obj.setUsername("user123");
        obj.setPassword("password");

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
        ObjectWriter ow = objectMapper.writer().withDefaultPrettyPrinter();
        String requestJson =  ow.writeValueAsString(obj);

        this.mockMvc
                .perform(post("/login")
                        .content(requestJson)
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isUnauthorized());
    }
}
