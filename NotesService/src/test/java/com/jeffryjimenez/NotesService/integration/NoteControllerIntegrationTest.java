package com.jeffryjimenez.NotesService.integration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.jeffryjimenez.NotesService.payload.NoteRequest;
import com.jeffryjimenez.NotesService.utils.JwtTokenProvider;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class NoteControllerIntegrationTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @Autowired
    AuthenticationConfiguration authConfig;

    String token = "";
    String BASE_URL = "/notes";

    @BeforeEach
    public void setUp() throws Exception {

       this.token = jwtTokenProvider.generateToken("johndoe", Arrays.asList("USER"));
    }

    @Test
    @DisplayName("GET current user notes")
    public void testGetCurrentUserNotes() throws Exception{

        mockMvc
                .perform(get(BASE_URL + "/me")
                        .header("authorization", "Bearer " + this.token))
                .andExpect(status().isOk());

    }

    @Test
    @DisplayName("GET current user notes with invalid token")
    public void testGetCurrentUserNotes_INVALID() throws Exception{

        String invalidToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJpbnZhbGlkIiwiYXV0aG9yaXRpZXMiOltdLCJpYXQiOjE2NjQ0NTkyNjIsImV4cCI6MTY2NDU0NTY2Mn0.CXgf61RUhvgk82dp7tlo2GDzuAqTGS3-K6y42uMkupGKgjEWf_7nN2CGlEJflFpy1WkV_cBTxl7mGfQEH2_gFA";

        mockMvc
                .perform(get(BASE_URL + "/me")
                        .header("authorization", "Bearer " + invalidToken))
                .andExpect(status().isUnauthorized());

    }

    @Test
    @DisplayName("GET current user notes without token")
    public void testGetCurrentUserNotes_NO_TOKEN() throws Exception{

        mockMvc
                .perform(get(BASE_URL + "/me"))
                .andExpect(status().isUnauthorized());

    }

    @Test
    @DisplayName("GET user notes by username")
    public void testGetUserNotesByUsername() throws Exception{

        String mariaToken = jwtTokenProvider.generateToken("maria", Arrays.asList("USER"));

        mockMvc
                .perform(get(BASE_URL + "/johndoe")
                        .header("authorization", "Bearer " + mariaToken))
                .andExpect(status().isOk());

    }

    @Test
    @DisplayName("GET user notes by username")
    public void testGetUserNotesByUsername_INVALID_TOKEN() throws Exception{

        String invalidToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJpbnZhbGlkIiwiYXV0aG9yaXRpZXMiOltdLCJpYXQiOjE2NjQ0NTkyNjIsImV4cCI6MTY2NDU0NTY2Mn0.CXgf61RUhvgk82dp7tlo2GDzuAqTGS3-K6y42uMkupGKgjEWf_7nN2CGlEJflFpy1WkV_cBTxl7mGfQEH2_gFA";

        mockMvc
                .perform(get(BASE_URL + "/johndoe")
                        .header("authorization", "Bearer " + invalidToken))
                .andExpect(status().isUnauthorized());

    }

    @Test
    @DisplayName("GET user notes by username NO TOKEN")
    public void testGetUserNotesByUsername_NO_TOKEN() throws Exception{

        mockMvc
                .perform(get(BASE_URL + "/johndoe"))
                .andExpect(status().isUnauthorized());

    }

    @Test
    @DisplayName("CREATE NOTE")
    public void testCreateNote() throws Exception{

        NoteRequest obj = new NoteRequest();
        obj.setMessage("message");

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
        ObjectWriter ow = objectMapper.writer().withDefaultPrettyPrinter();
        String requestJson =  ow.writeValueAsString(obj);

        this.mockMvc
                .perform(post(BASE_URL + "/")
                        .header("authorization", "Bearer " + this.token)
                        .content(requestJson)
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isCreated())
                .andExpect(content().json("{'message': 'message'}"));

    }

    @Test
    @DisplayName("CREATE NOTE INVALID TOKEN")
    public void testCreateNote_INVALID_TOKEN() throws Exception{

        NoteRequest obj = new NoteRequest();
        obj.setMessage("message");

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
        ObjectWriter ow = objectMapper.writer().withDefaultPrettyPrinter();
        String requestJson =  ow.writeValueAsString(obj);


        String invalidToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJpbnZhbGlkIiwiYXV0aG9yaXRpZXMiOltdLCJpYXQiOjE2NjQ0NTkyNjIsImV4cCI6MTY2NDU0NTY2Mn0.CXgf61RUhvgk82dp7tlo2GDzuAqTGS3-K6y42uMkupGKgjEWf_7nN2CGlEJflFpy1WkV_cBTxl7mGfQEH2_gFA";

        this.mockMvc
                .perform(post(BASE_URL + "/")
                        .header("authorization", "Bearer " + invalidToken)
                        .content(requestJson)
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isUnauthorized());

    }


    @Test
    @DisplayName("CREATE NOTE NO TOKEN")
    public void testCreateNote_NO_TOKEN() throws Exception{

        NoteRequest obj = new NoteRequest();
        obj.setMessage("message");

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
        ObjectWriter ow = objectMapper.writer().withDefaultPrettyPrinter();
        String requestJson =  ow.writeValueAsString(obj);


        String invalidToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJpbnZhbGlkIiwiYXV0aG9yaXRpZXMiOltdLCJpYXQiOjE2NjQ0NTkyNjIsImV4cCI6MTY2NDU0NTY2Mn0.CXgf61RUhvgk82dp7tlo2GDzuAqTGS3-K6y42uMkupGKgjEWf_7nN2CGlEJflFpy1WkV_cBTxl7mGfQEH2_gFA";

        this.mockMvc
                .perform(post(BASE_URL + "/")
                        .content(requestJson)
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isUnauthorized());

    }


    @Test
    @DisplayName("Delete NOTE")
    public void testDeleteNote() throws Exception {


        this.mockMvc
                .perform(delete(BASE_URL + "/1")
                        .header("authorization", "Bearer " + this.token)
                )
                .andExpect(status().isNoContent());


    }

    @Test
    @DisplayName("Delete not NOT FOUND")
    public void testDeleteNote_NOT_FOUND() throws Exception{


        this.mockMvc
                .perform(delete(BASE_URL + "/6")
                        .header("authorization", "Bearer " + this.token)
                )
                .andExpect(status().isNotFound());


    }

    @Test
    @DisplayName("Delete not NOT OWNER")
    public void testDeleteNote_NOT_OWNER() throws Exception{


        String mariaToken = jwtTokenProvider.generateToken("maria", Arrays.asList("USER"));

        this.mockMvc
                .perform(delete(BASE_URL + "/1")
                        .header("authorization", "Bearer " + mariaToken)
                )
                .andExpect(status().isForbidden());


    }

    @Test
    @DisplayName("Delete note INVALID TOKEN")
    public void testDeleteNote_INVALID_TOKEN() throws Exception{


        String invalidToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJpbnZhbGlkIiwiYXV0aG9yaXRpZXMiOltdLCJpYXQiOjE2NjQ0NTkyNjIsImV4cCI6MTY2NDU0NTY2Mn0.CXgf61RUhvgk82dp7tlo2GDzuAqTGS3-K6y42uMkupGKgjEWf_7nN2CGlEJflFpy1WkV_cBTxl7mGfQEH2_gFA";

        this.mockMvc
                .perform(delete(BASE_URL + "/1")
                        .header("authorization", "Bearer " + invalidToken)
                )
                .andExpect(status().isUnauthorized());


    }

    @Test
    @DisplayName("Delete note INVALID TOKEN")
    public void testDeleteNote_NO_TOKEN() throws Exception{


        this.mockMvc
                .perform(delete(BASE_URL + "/1")
                )
                .andExpect(status().isUnauthorized());


    }









}
