package com.jeffryjimenez.OrdersService.payload;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class OrdersInfoResponse {

    long numOfOrders;
    double total;

}
