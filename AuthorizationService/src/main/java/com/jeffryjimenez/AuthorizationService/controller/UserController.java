package com.jeffryjimenez.AuthorizationService.controller;

import com.jeffryjimenez.AuthorizationService.domain.Users;
import com.jeffryjimenez.AuthorizationService.exception.EmailAlreadyExistsException;
import com.jeffryjimenez.AuthorizationService.exception.ResourceNotFoundException;
import com.jeffryjimenez.AuthorizationService.exception.UsernameAlreadyExistsException;
import com.jeffryjimenez.AuthorizationService.payload.*;
import com.jeffryjimenez.AuthorizationService.service.JwtTokenProvider;
import com.jeffryjimenez.AuthorizationService.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.annotation.RequestScope;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/auth")
@Slf4j
public class UserController {

    private UserService userService;
    private AuthenticationManager authenticationManager;
    private JwtTokenProvider tokenProvider;


    public UserController(UserService userService, AuthenticationManager authenticationManager, JwtTokenProvider tokenProvider) {

        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;

    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(authentication);

        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
    }

    @PostMapping(value = "/users", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createUser(@Valid @RequestBody SignUpRequest payload) {
        log.info("creating user {}", payload.getUsername());

        Users user = Users.builder()
                .username(payload.getUsername())
                .email(payload.getEmail())
                .password(payload.getPassword())
                .build();

        try {
            userService.registerUser(user);
        } catch (UsernameAlreadyExistsException | EmailAlreadyExistsException e) {
            throw new BadCredentialsException(e.getMessage());
        }

        URI location = ServletUriComponentsBuilder.fromCurrentContextPath().path("/users/{username}")
                .buildAndExpand(user.getUsername()).toUri();

        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "User registered successfully"));
    }

    @GetMapping(value = "/users/{username}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> findUser(@PathVariable("username") String username){
        log.info("retrieving user {}", username);

        return userService.findByUsername(username).map(user -> ResponseEntity.ok(user)).orElseThrow(() -> new ResourceNotFoundException(username));
    }

    @GetMapping(value = "/users", produces =  MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> findAll(){
        log.info("retrieving all users");

        return ResponseEntity.ok(userService.findAll());

    }

    @GetMapping(value = "/users/me", produces = MediaType.APPLICATION_JSON_VALUE)
//    @PreAuthorize("hasRole('USER')")
    @ResponseStatus(HttpStatus.OK)
    public UserSummary getCurrentUser(@AuthenticationPrincipal Users user){
        return UserSummary.builder()
                .id(user.getId())
                .username(user.getUsername())
                .build();
    }

    @GetMapping(value="/users/summary/{username}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getUserSummary(@PathVariable("username") String username){
        log.info("retrieving user {}", username);

        return userService.findByUsername(username)
                .map(user -> ResponseEntity.ok(convertTo(user)))
                .orElseThrow(() -> new ResourceNotFoundException(username));
    }

    @GetMapping(value = "/users/summary",  produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAllUsersSummary(){
        log.info("retrieving all users summaries");

        List<UserSummary> users = userService.findAll().stream().map(x -> convertTo(x)).collect(Collectors.toList());

        return ResponseEntity.ok(users);
    }

    //TODO write test
    @PostMapping(value="/users/summary/in", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getUsersSummaries(@RequestBody List<String> username){
        log.info("retrieving summaries for {} users", username.size());

        List<UserSummary> summaries = userService.findByUsernameIn(username)
                .stream()
                .map(user -> convertTo(user))
                .collect(Collectors.toList());

        return ResponseEntity.ok(summaries);
    }

    private UserSummary convertTo(Users user){

        return UserSummary.builder()
                .id(user.getId())
                .username(user.getUsername())
                .build();
    }






}
