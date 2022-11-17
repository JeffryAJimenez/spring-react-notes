package com.jeffryjimenez.OrdersService.errorHandler;

import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.Consumer;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.kafka.listener.CommonErrorHandler;
import org.springframework.kafka.listener.ConsumerAwareErrorHandler;
import org.springframework.kafka.listener.MessageListenerContainer;


@Slf4j
public class ConsumerErrorHandler implements CommonErrorHandler {

    @Override
    public void handleOtherException(Exception thrownException, Consumer<?, ?> consumer, MessageListenerContainer container, boolean batchListener) {
          /* here you can do you custom handling, I am just logging it same as default Error handler does
        If you just want to log. you need not configure the error handler here. The default handler does it for you.
        Generally, you will persist the failed records to DB for tracking the failed records.  */
        log.error("Error in process with Exception {} and the record is {}", thrownException);
    }

    @Override
    public void handleRecord(Exception thrownException, ConsumerRecord<?, ?> record, Consumer<?, ?> consumer, MessageListenerContainer container) {
         /* here you can do you custom handling, I am just logging it same as default Error handler does
        If you just want to log. you need not configure the error handler here. The default handler does it for you.
        Generally, you will persist the failed records to DB for tracking the failed records.  */
        log.error("Error in process with Exception {} and the record is {}", thrownException);
    }
}
