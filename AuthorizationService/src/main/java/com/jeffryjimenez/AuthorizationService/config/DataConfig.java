package com.jeffryjimenez.AuthorizationService.config;

import com.jeffryjimenez.AuthorizationService.domain.Users;
import com.jeffryjimenez.AuthorizationService.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataConfig {

    @Bean
    public CommandLineRunner commandLineRunner(UserRepository userRepository, PasswordEncoder passwordEncoder){

        return x -> {

            userRepository.save(new Users("admin1", passwordEncoder.encode("password"),"admin1@email.com","ADMIN" ));
            userRepository.save(new Users("admin2", passwordEncoder.encode("password"),"admin2@email.com","ADMIN"));
            userRepository.save(new Users("user1", passwordEncoder.encode("password"),"user1@email.com","ROLE_USER"));
            userRepository.save(new Users("user2", passwordEncoder.encode("password"),"user2@email.com","ROLE_USER"));

        };
    }
}
