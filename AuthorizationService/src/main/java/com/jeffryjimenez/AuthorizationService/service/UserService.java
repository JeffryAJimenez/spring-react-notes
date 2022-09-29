package com.jeffryjimenez.AuthorizationService.service;

import com.jeffryjimenez.AuthorizationService.domain.Role;
import com.jeffryjimenez.AuthorizationService.domain.Users;
import com.jeffryjimenez.AuthorizationService.exception.EmailAlreadyExistsException;
import com.jeffryjimenez.AuthorizationService.exception.UsernameAlreadyExistsException;
import com.jeffryjimenez.AuthorizationService.messaging.KafkaUserMessagingService;
import com.jeffryjimenez.AuthorizationService.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Lazy;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;

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


}
