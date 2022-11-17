package com.jeffryjimenez.OrdersService.messaging;

import com.jeffryjimenez.OrdersService.payload.KafkaUserChange;
import com.jeffryjimenez.OrdersService.service.OrderService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class Consumer {

    private OrderService orderService;

    public Consumer(OrderService orderService){
        this.orderService = orderService;
    }

//    @KafkaListener(topics = "orders.username.updated", groupId = "group_id", containerFactory = "userChangedListener")
    @KafkaListener(topics = "orders.username.updated", groupId = "group_id")
    public void consume(KafkaUserChange message){
        log.info(String.format("$$ -> Consumed Message -> %s", message.getNewUser()));
        orderService.updateCreator(message.getOldUser(), message.getNewUser());
    }
}
