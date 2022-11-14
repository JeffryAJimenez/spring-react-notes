package com.jeffryjimenez.OrdersService;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.jeffryjimenez.OrdersService.payload.OrderRequest;
import com.jeffryjimenez.OrdersService.utils.JwtTokenProvider;
import org.aspectj.weaver.ast.Or;
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
public class OrderControllerIntegrationTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private AuthenticationConfiguration authConfig;

    private String token = "";

    private String BASE_URL = "/api/orders";

    @BeforeEach
    public void setUp() throws Exception {

        this.token = tokenProvider.generateToken("user1", Arrays.asList("USER"));
    }

    @Test
    @DisplayName("GET ORDERS")
    public void testGetAllOrders_OK() throws Exception {

        mockMvc.perform(get(BASE_URL)
                .header("authorization", "Bearer " + this.token))
                .andExpect(status().isOk());

    }

    @Test
    @DisplayName("GET ORDERS INVALID TOKEN")
    public void testGetAllOrders_INVALID_TOKEN() throws Exception {

        String invalidToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJpbnZhbGlkIiwiYXV0aG9yaXRpZXMiOltdLCJpYXQiOjE2NjQ0NTkyNjIsImV4cCI6MTY2NDU0NTY2Mn0.CXgf61RUhvgk82dp7tlo2GDzuAqTGS3-K6y42uMkupGKgjEWf_7nN2CGlEJflFpy1WkV_cBTxl7mGfQEH2_gFA";

        mockMvc.perform(get(BASE_URL)
                        .header("authorization", "Bearer " + invalidToken))
                .andExpect(status().isUnauthorized());

    }

    @Test
    @DisplayName("GET ORDERS NO TOKEN")
    public void testGetAllOrders_NO_TOKEN() throws Exception {

        mockMvc.perform(get(BASE_URL))
                .andExpect(status().isUnauthorized());

    }


    @Test
    @DisplayName("CREATE ORDER SUCCESS")
    public void createOrder_OK() throws Exception{

        OrderRequest obj = new OrderRequest();
        obj.setTotal(19.22);

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
        ObjectWriter ow = objectMapper.writer().withDefaultPrettyPrinter();
        String requestJson =  ow.writeValueAsString(obj);

        this.mockMvc
                .perform(post(BASE_URL)
                        .header("authorization", "Bearer " + this.token)
                        .content(requestJson)
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isCreated());

    }

    @Test
    @DisplayName("CREATE ORDER UNAUTHORIZED")
    public void createOrder_UNAUTHORIZED() throws Exception{

        OrderRequest obj = new OrderRequest();
        obj.setTotal(19.22);

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
        ObjectWriter ow = objectMapper.writer().withDefaultPrettyPrinter();
        String requestJson =  ow.writeValueAsString(obj);

        String invalidToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJpbnZhbGlkIiwiYXV0aG9yaXRpZXMiOltdLCJpYXQiOjE2NjQ0NTkyNjIsImV4cCI6MTY2NDU0NTY2Mn0.CXgf61RUhvgk82dp7tlo2GDzuAqTGS3-K6y42uMkupGKgjEWf_7nN2CGlEJflFpy1WkV_cBTxl7mGfQEH2_gFA";

        this.mockMvc
                .perform(post(BASE_URL)
                        .header("authorization", "Bearer " + invalidToken)
                        .content(requestJson)
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isUnauthorized());

        this.mockMvc
                .perform(post(BASE_URL)
                        .content(requestJson)
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isUnauthorized());

    }

    @Test
    @DisplayName("CREATE ORDER BAD REQUEST")
    public void createOrder_BAD_REQUEST() throws Exception{

        OrderRequest obj1 = new OrderRequest();
        obj1.setTotal(67000.01);
        OrderRequest obj2 = new OrderRequest();
        obj2.setTotal(-0.1);
        OrderRequest obj3 = new OrderRequest();


        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
        ObjectWriter ow = objectMapper.writer().withDefaultPrettyPrinter();

        String requestJson1 =  ow.writeValueAsString(obj1);
        String requestJson2 =  ow.writeValueAsString(obj2);
        String requestJson3 =  ow.writeValueAsString(obj3);

        this.mockMvc
                .perform(post(BASE_URL)
                        .header("authorization", "Bearer " + this.token)
                        .content(requestJson1)
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest());

        this.mockMvc
                .perform(post(BASE_URL)
                        .header("authorization", "Bearer " + this.token)
                        .content(requestJson2)
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest());

        this.mockMvc
                .perform(post(BASE_URL)
                        .header("authorization", "Bearer " + this.token)
                        .content(requestJson3)
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest());

    }

    @Test
    @DisplayName("DELETE ORDER SUCCESS")
    public void testDeleteOrder_OK() throws Exception{

        long id = 1l;

        this.mockMvc
                .perform(delete(BASE_URL + "/" + id)
                        .header("authorization", "Bearer " + this.token))
                .andExpect(status().isOk());


    }

    @Test
    @DisplayName("DELETE ORDER UNAUTHORIZED")
    public void testDeleteOrder_UNATHORIZED() throws Exception{

        long id = 1l;

        String invalidToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJpbnZhbGlkIiwiYXV0aG9yaXRpZXMiOltdLCJpYXQiOjE2NjQ0NTkyNjIsImV4cCI6MTY2NDU0NTY2Mn0.CXgf61RUhvgk82dp7tlo2GDzuAqTGS3-K6y42uMkupGKgjEWf_7nN2CGlEJflFpy1WkV_cBTxl7mGfQEH2_gFA";

        this.mockMvc
                .perform(delete(BASE_URL + "/" + id)
                        .header("authorization", "Bearer " + invalidToken))
                .andExpect(status().isUnauthorized());

        this.mockMvc
                .perform(delete(BASE_URL + "/" + id))
                .andExpect(status().isUnauthorized());


    }


    @Test
    @DisplayName("DELETE ORDER NOT FOUND")
    public void testDeleteOrder_NOT_FOUND() throws Exception{

        long id = 1234l;


        this.mockMvc
                .perform(delete(BASE_URL + "/" + id)
                        .header("authorization", "Bearer " + this.token))
                .andExpect(status().isNotFound());

        this.mockMvc
                .perform(delete(BASE_URL + "/hello")
                        .header("authorization", "Bearer " + this.token))
                .andExpect(status().isBadRequest());

    }


    @Test
    @DisplayName("DELETE ORDER FORBIDDEN")
    public void testDeleteOrder_FORBIDDEN() throws Exception{

        long id = 2l;


        this.mockMvc
                .perform(delete(BASE_URL + "/" + id)
                        .header("authorization", "Bearer " + this.token))
                .andExpect(status().isForbidden());


    }




}
