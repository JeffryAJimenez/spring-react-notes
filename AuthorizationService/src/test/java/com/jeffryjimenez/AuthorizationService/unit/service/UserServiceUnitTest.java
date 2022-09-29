package com.jeffryjimenez.AuthorizationService.unit.service;

import com.jeffryjimenez.AuthorizationService.domain.Users;
import com.jeffryjimenez.AuthorizationService.repository.UserRepository;
import com.jeffryjimenez.AuthorizationService.service.UserService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.junit.jupiter.api.Assertions.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class UserServiceUnitTest {

    @InjectMocks
    UserService userService;

    @Mock
    UserRepository userRepository;

    @DisplayName("User service find all users")
    @Test
    public void findAllUsersTest(){

        List<Users> expected = Arrays.asList(new Users("admin1", "password" ,"admin1@email.com","ADMIN" ),
        new Users("admin2", "password","admin2@email.com","ADMIN"),
        new Users("user1", "password","user1@email.com","ROLE_USER"),
        new Users("user2", "password","user2@email.com","ROLE_USER"));

        when(userRepository.findAll())
                .thenReturn(new ArrayList<>(expected));

        List<Users> actual = userService.findAll();

        assertArrayEquals(expected.toArray(), actual.toArray());

    }

    @DisplayName("User service find by user name FOUND")
    @Test
    public void findByUsernameFoundTest(){

        String username = "user2";
        Users expected =  new Users(username, "password","user2@email.com","ROLE_USER");
        Optional<Users> actualOptional =  Optional.of(new Users(username, "password","user2@email.com","ROLE_USER"));
        when(userRepository.findByUsername(username)).thenReturn(actualOptional);

        Optional<Users> actual = userService.findByUsername(username);

        assertTrue(actual.isPresent());
        assertEquals(expected, actual.get());
    }

    @DisplayName("User service find by user name NOT FOUND")
    @Test
    public void findByUsernameNotFoundTest(){

        String username = "user2";
        when(userRepository.findByUsername(username)).thenReturn(Optional.empty());

        Optional<Users> actual = userService.findByUsername(username);

        assertTrue(!actual.isPresent());
    }

    @DisplayName("User service find all users in list")
    @Test
    public void findAllUsersInTest(){

        List<String> usernames = Arrays.asList("admin1", "admin2", "user1", "user2");

        List<Users> expected = Arrays.asList(new Users("admin1", "password" ,"admin1@email.com","ADMIN" ),
                new Users("admin2", "password","admin2@email.com","ADMIN"),
                new Users("user1", "password","user1@email.com","ROLE_USER"),
                new Users("user2", "password","user2@email.com","ROLE_USER"));

        when(userRepository.findByUsernameIn(usernames))
                .thenReturn(new ArrayList<>(expected));

        List<Users> actual = userService.findByUsernameIn(usernames);

        assertArrayEquals(expected.toArray(), actual.toArray());

    }



}
