package com.jeffryjimenez.OrdersService.config;

import com.jeffryjimenez.OrdersService.domain.Order;
import com.jeffryjimenez.OrdersService.repository.OrderRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataConfig {

    @Bean
    public CommandLineRunner commandLineRunner(OrderRepository orderRepo){

        return x  -> {
          orderRepo.save(new Order("user1", 22.22));
          orderRepo.save(new Order("user2", 68.23));
          orderRepo.save(new Order("user1", 62.24));
          orderRepo.save(new Order("user1", 768.67));
          orderRepo.save(new Order("user1", 68.68));
          orderRepo.save(new Order("user1", 62.24));
          orderRepo.save(new Order("user1", 768.67));
          orderRepo.save(new Order("user1", 68.68));
          orderRepo.save(new Order("user1", 62.24));
          orderRepo.save(new Order("user1", 768.67));
          orderRepo.save(new Order("user1", 68.68));
          orderRepo.save(new Order("user1", 62.24));
          orderRepo.save(new Order("user1", 768.67));
          orderRepo.save(new Order("user1", 68.68));

        };
    }
}
