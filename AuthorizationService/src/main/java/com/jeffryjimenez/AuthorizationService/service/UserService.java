package com.jeffryjimenez.AuthorizationService.service;

import com.jeffryjimenez.AuthorizationService.domain.Role;
import com.jeffryjimenez.AuthorizationService.domain.Users;
import com.jeffryjimenez.AuthorizationService.exception.BadFormatException;
import com.jeffryjimenez.AuthorizationService.exception.EmailAlreadyExistsException;
import com.jeffryjimenez.AuthorizationService.exception.ResourceNotFoundException;
import com.jeffryjimenez.AuthorizationService.exception.UsernameAlreadyExistsException;
import com.jeffryjimenez.AuthorizationService.messaging.KafkaUserMessagingService;
import com.jeffryjimenez.AuthorizationService.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.validator.routines.EmailValidator;
import org.springframework.context.annotation.Lazy;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@Slf4j
public class UserService {

    private PasswordEncoder passwordEncoder;
    private UserRepository userRepository;
    private KafkaUserMessagingService kafkaUserMessagingService;

    public UserService(@Lazy UserRepository userRepository, @Lazy PasswordEncoder passwordEncoder, @Lazy KafkaUserMessagingService kafkaUserMessagingService){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.kafkaUserMessagingService = kafkaUserMessagingService;
    }

    public List<Users> findAll(){
        log.info("Retrieving all users");
        return userRepository.findAll();
    }

    public Optional<Users> findByUsername(String username){
        log.info("Retrieving user {}", username);
        return userRepository.findByUsername(username);
    }

    public List<Users> findByUsernameIn(List<String> usernames){
        log.info("retrieving users with username in given list");
        return userRepository.findByUsernameIn(usernames);
    }

    public Users registerUser(Users user){
        log.info("registering user {}", user.getUsername());

        if(userRepository.existsByUsername(user.getUsername())){
            log.warn("username {} already exists", user.getUsername());

            throw new UsernameAlreadyExistsException(String.format("username %s already exists", user.getUsername()));
        }

        if(userRepository.existsByEmail(user.getEmail())){
            log.warn("email {} already exists", user.getEmail());

            throw new EmailAlreadyExistsException(String.format("email %s already exists", user.getEmail()));
        }

        user.setActive(true);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole("USER");
        Users savedUser = userRepository.save(user);
        kafkaUserMessagingService.sendUserCreated(savedUser);

        return savedUser;
    }

    //TODO write test case
    public Users updateUserEmail(String username, String email){

        if(!EmailValidator.getInstance().isValid(email)) {

            log.warn("email does not have a valid format");

            throw new BadFormatException("Email");
        }

        if (userRepository.existsByEmail(email)){

            log.warn("email {} already exists", email);
            throw new EmailAlreadyExistsException(String.format("email %s already exists", email));
        }

        Optional<Users> userOpt = userRepository.findByUsername(username);

        if(userOpt.isEmpty()){

            log.warn("username {} does not exists", username);
            throw new ResourceNotFoundException(username);

        }

        Users user = userOpt.get();
        user.setEmail(email);

        return userRepository.save(user);

    }


    //TODO write test case
    public Users updateUserFullName(String username, String fullName){

        if(fullName == null || fullName.trim().equals("")){
             throw new BadFormatException("Full Name");
        }

        Optional<Users> userOpt = userRepository.findByUsername(username);

        if(userOpt.isEmpty()){

            log.warn("username {} does not exists", username);
            throw new ResourceNotFoundException(username);

        }

        Users user = userOpt.get();
        user.setFullName(fullName);

        return userRepository.save(user);

    }

    //TODO add new test case
    public Users updateUserPassword(String username, String password){

        if(password == null || !passwordIsValid(password)) {

            log.warn("Password is not strong enough");

            throw new BadFormatException("Password");
        }


        Optional<Users> userOpt = userRepository.findByUsername(username);

        if(userOpt.isEmpty()){

            log.warn("username {} does not exists", username);
            throw new ResourceNotFoundException(username);

        }

        Users user = userOpt.get();
        user.setPassword(passwordEncoder.encode(password));

        return userRepository.save(user);

    }

//    public Users updateUserUsername(String username, String newUsername){
//
//        if(!EmailValidator.getInstance().isValid(email)) {
//
//            log.warn("email does not have a valid format");
//
//            throw new BadFormatException("Email");
//        }
//
//        if (userRepository.existsByEmail(email)){
//
//            log.warn("email {} already exists", email);
//            throw new EmailAlreadyExistsException(String.format("email %s already exists", email));
//        }
//
//        Optional<Users> userOpt = userRepository.findByUsername(username);
//
//        if(userOpt.isEmpty()){
//
//            log.warn("username {} does not exists", username);
//            throw new ResourceNotFoundException(username);
//
//        }
//
//        Users user = userOpt.get();
//        user.setEmail(email);
//
//        return userRepository.save(user);
//
//    }

    private boolean passwordIsValid(String password){
        String regex = "^(?=.*[0-9])"
                + "(?=.*[a-z])(?=.*[A-Z])"
                + "(?=.*[@#$%^&+=])"
                + "(?=\\S+$).{8,20}$";

        // Compile the ReGex
        Pattern p = Pattern.compile(regex);

        // If the password is empty
        // return false
        if (password == null) {
            return false;
        }

        // Pattern class contains matcher() method
        // to find matching between given password
        // and regular expression.
        Matcher m = p.matcher(password);

        // Return if the password
        // matched the ReGex
        return m.matches();
     }

}
