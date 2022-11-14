package com.jeffryjimenez.AuthorizationService;

import com.jeffryjimenez.AuthorizationService.domain.Users;
import com.jeffryjimenez.AuthorizationService.exception.BadFormatException;
import com.jeffryjimenez.AuthorizationService.exception.EmailAlreadyExistsException;
import com.jeffryjimenez.AuthorizationService.exception.ResourceNotFoundException;
import com.jeffryjimenez.AuthorizationService.repository.UserRepository;
import com.jeffryjimenez.AuthorizationService.service.UserService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class UserServiceUnitTest {

    @InjectMocks
    UserService userService;

    @Mock
    UserRepository userRepository;

    @Mock
    PasswordEncoder passwordEncoder;

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
        Users expected =  new Users(username, "John Doe", "password","user2@email.com","ROLE_USER");
        Optional<Users> actualOptional =  Optional.of(new Users(username, "John Doe", "password","user2@email.com","ROLE_USER"));
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

    @DisplayName("UPDATE EMAIL")
    @Test
    public void testUpdateUserEmail_SUCCESS(){

        String oldEmail = "old@gmail.com";
        String newEmail = "new@gmail.com";
        Users old_obj = new Users("John", "John Doe", "Password#0", oldEmail, "USER");
        Users new_obj = new Users("John", "John Doe", "Password#0", newEmail, "USER");

        when(userRepository.existsByEmail(anyString()))
                .thenReturn(false);

        when(userRepository.findByUsername(anyString()))
                .thenReturn(Optional.of(old_obj));

        when(userRepository.save(any(Users.class)))
                .thenReturn(new_obj);

        Users expected = userService.updateUserEmail("johndoe", newEmail);


        assertEquals(expected, new_obj);

    }

    @DisplayName("UPDATE EMAIL ALREADY EXISTS")
    @Test
    public void testUpdateUserEmail_DUPLICATE_EMAIL(){

        String newEmail = "new@gmail.com";


        when(userRepository.existsByEmail(anyString()))
                .thenReturn(true);

        assertThrows(EmailAlreadyExistsException.class , () -> userService.updateUserEmail("johndoe", newEmail));


    }

    @DisplayName("UPDATE EMAIL USER NOT FOUND")
    @Test
    public void testUpdateUserEmail_USER_NOT_FOUND(){

        String newEmail = "new@gmail.com";

        when(userRepository.existsByEmail(anyString()))
                .thenReturn(false);

        when(userRepository.findByUsername(anyString()))
                .thenReturn(Optional.empty());


        assertThrows(ResourceNotFoundException.class , () -> userService.updateUserEmail("johndoe", newEmail));


    }

    @DisplayName("UPDATE EMAIL BAD FORMAT")
    @Test
    public void testUpdateUserEmail_BAD_FORMAT(){

        String newEmail = "new@g";

        assertThrows(BadFormatException.class , () -> userService.updateUserEmail("johndoe", newEmail));


    }

    @DisplayName("UPDATE PASSWORD")
    @Test
    public void testUpdateUserPassword_SUCCESS(){

        String oldPwd = "Password#0";
        String newPwd = "Password#1";
        Users old_obj = new Users("John", "John Doe", oldPwd, "test@gmail.com", "USER");
        Users new_obj = new Users("John", "John Doe", newPwd, "test@gmail.com", "USER");


        when(userRepository.findByUsername(anyString()))
                .thenReturn(Optional.of(old_obj));

        when(userRepository.save(any(Users.class)))
                .thenReturn(new_obj);

        when(passwordEncoder.encode(anyString()))
                .thenReturn(newPwd);

        Users expected = userService.updateUserPassword("johndoe", newPwd);


        assertEquals(expected, new_obj);

    }

    @DisplayName("UPDATE PASSWORD NOT STRONG")
    @Test
    public void testUpdateUserPassword_NOT_STRONG(){

        String bad1 = "password#0";
        String bad2 = "Password00";
        String bad3 = "Password##";
        String bad4 = "pass";


        assertThrows(BadFormatException.class , () -> userService.updateUserPassword("johndoe", bad1));
        assertThrows(BadFormatException.class , () -> userService.updateUserPassword("johndoe", bad2));
        assertThrows(BadFormatException.class , () -> userService.updateUserPassword("johndoe", bad3));
        assertThrows(BadFormatException.class , () -> userService.updateUserPassword("johndoe", bad4));
        assertThrows(BadFormatException.class , () -> userService.updateUserPassword("johndoe", null));

    }

    @DisplayName("UPDATE PASSWORD USER NOT FOUND")
    @Test
    public void testUpdateUserPassword_USER_NOT_EXISTS(){


        String newPwd = "Password#0";

        when(userRepository.findByUsername(anyString()))
                .thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class , () -> userService.updateUserPassword("johndoe", newPwd));


    }

    @DisplayName("UPDATE FULL NAME")
    @Test
    public void testUpdateUserFullName_SUCCESS(){

        String oldFullName = "John Doe";
        String newFullName = "Johnathan Doester";
        Users old_obj = new Users("John", oldFullName, "Password#0", "test@gmail.com", "USER");
        Users new_obj = new Users("John", newFullName, "Password#0", "test@gmail.com", "USER");


        when(userRepository.findByUsername(anyString()))
                .thenReturn(Optional.of(old_obj));

        when(userRepository.save(any(Users.class)))
                .thenReturn(new_obj);


        Users expected = userService.updateUserFullName("johndoe", newFullName);


        assertEquals(expected, new_obj);

    }

    @DisplayName("UPDATE FULL NAME NOT VALID")
    @Test
    public void testUpdateUserFullName_BAD_FORMAT(){

        String bad1 = "";
        String bad2 = null;


        assertThrows(BadFormatException.class , () -> userService.updateUserFullName("johndoe", bad1));
        assertThrows(BadFormatException.class , () -> userService.updateUserFullName("johndoe", bad2));


    }

    @DisplayName("UPDATE FULL NAME USER NOT FOUND")
    @Test
    public void testUpdateUserFullName_USER_NOT_EXISTS(){


        String newFullName = "John Doe";

        when(userRepository.findByUsername(anyString()))
                .thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class , () -> userService.updateUserFullName("johndoe", newFullName));


    }


}
