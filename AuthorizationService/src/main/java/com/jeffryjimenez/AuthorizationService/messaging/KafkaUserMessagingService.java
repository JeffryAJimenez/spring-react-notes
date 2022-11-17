package com.jeffryjimenez.AuthorizationService.messaging;

import com.jeffryjimenez.AuthorizationService.domain.Users;
import com.jeffryjimenez.AuthorizationService.payload.KafkaUserChange;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class KafkaUserMessagingService  implements UserMessagingService{

    private KafkaTemplate<String, KafkaUserChange> kafkaTemplate;

    public KafkaUserMessagingService(KafkaTemplate<String, KafkaUserChange> kafkaTemplate){
        this.kafkaTemplate = kafkaTemplate;
    }

    @Override
    public void sendUsernameChanged(String oldUser, String newUser) {

        KafkaUserChange payload = new KafkaUserChange();
        payload.setOldUser(oldUser);
        payload.setNewUser(newUser);

        kafkaTemplate.send("orders.username.updated",  payload);
    }

    @Override
    public void sendUserUpdated(Users user) {

//        kafkaTemplate.send("notes.users.updated.topic", user);

    }
}
