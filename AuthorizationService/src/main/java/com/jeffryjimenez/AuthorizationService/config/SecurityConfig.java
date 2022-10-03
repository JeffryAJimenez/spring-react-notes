package com.jeffryjimenez.AuthorizationService.config;

import com.jeffryjimenez.AuthorizationService.domain.Users;
import com.jeffryjimenez.AuthorizationService.filter.JwtTokenAuthenticationFilter;
import com.jeffryjimenez.AuthorizationService.repository.UserRepository;
import com.jeffryjimenez.AuthorizationService.service.JwtTokenProvider;
import com.jeffryjimenez.AuthorizationService.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.http.HttpServletResponse;
import java.util.Optional;


@EnableWebSecurity
@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

    @Autowired
    private JwtConfig jwtConfig;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private UserService userService;


    @Value("${security.service.username}")
    public String serviceUsername;
    @Value("${security.service.password}")
    public String servicePassword;

    @Bean
    public UserDetailsService uds(UserRepository userRepository){

        return username -> {

            Optional<Users> usersOptional = userRepository.findByUsername(username);

            if(usersOptional.isPresent()){
                return usersOptional.get();
            }

            throw new UsernameNotFoundException("User '" + username + "' not found");
        };

    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception{

        httpSecurity.csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .exceptionHandling().authenticationEntryPoint(((request, response, authException) -> response.sendError(HttpServletResponse.SC_UNAUTHORIZED)))
                .and()
                .addFilterBefore(new JwtTokenAuthenticationFilter(serviceUsername, jwtConfig, tokenProvider, userService), UsernamePasswordAuthenticationFilter.class)
                .authorizeRequests()
                .antMatchers(HttpMethod.POST, "/auth/login").permitAll()
                .antMatchers(HttpMethod.POST, "/auth/users").anonymous()
                .antMatchers("/console/**").permitAll()
                .anyRequest().authenticated();

        httpSecurity.headers().frameOptions().disable();
        return httpSecurity.build();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}
