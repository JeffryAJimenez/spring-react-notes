package com.jeffryjimenez.AuthorizationService.messaging;

import com.jeffryjimenez.AuthorizationService.domain.Users;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class KafkaUserMessagingService  implements UserMessagingService{

    private KafkaTemplate<String, Users> kafkaTemplate;

    public KafkaUserMessagingService(KafkaTemplate<String, Users> kafkaTemplate){
        this.kafkaTemplate = kafkaTemplate;
    }

    @Override
    public void sendUserCreated(Users user) {

        kafkaTemplate.send("notes.users.created.topic", user);
    }

    @Override
    public void sendUserUpdated(Users user) {

        kafkaTemplate.send("notes.users.updated.topic", user);

    }
}
