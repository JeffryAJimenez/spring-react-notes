package com.jeffryjimenez.OrdersService.controller;

import com.jeffryjimenez.OrdersService.domain.Order;
import com.jeffryjimenez.OrdersService.payload.OrderRequest;
import com.jeffryjimenez.OrdersService.payload.OrdersInfoResponse;
import com.jeffryjimenez.OrdersService.repository.OrderRepository;
import com.jeffryjimenez.OrdersService.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class OrderController {

    private OrderService orderService;

    public OrderController(OrderService orderService){
        this.orderService = orderService;
    }

    @GetMapping
    public Page<Order> getAllOrders(Pageable pageable, Principal principal){

        return orderService.getAllByCreator(principal.getName(), pageable);

    }

    @GetMapping("/info")
    public ResponseEntity<?> getOrdersInfo(Principal principal){


        double totalSum = orderService.totalSumByUsername(principal.getName());
        long countOrders  = orderService.countOfOrdersByUsername(principal.getName());

        OrdersInfoResponse ordersInfoResponse =
                OrdersInfoResponse
                        .builder()
                        .numOfOrders(countOrders)
                        .total(totalSum)
                        .build();

        return ResponseEntity.ok(ordersInfoResponse);
    }

//    @PatchMapping{"/{username}"}
//    public int patchCreatorField(){
//
//        return
//    }

    @PostMapping
    public ResponseEntity<?> createOrder(@Valid @RequestBody OrderRequest request, Principal principal){

        Order order = new Order();
        order.setTotal(request.getTotal());

        Order newOrder = orderService.createOrder(order, principal.getName());

        return new ResponseEntity<>(newOrder, HttpStatus.CREATED);

    }

    @DeleteMapping("/{orderId}")
    public ResponseEntity<?> deleteOrder(@PathVariable(value = "orderId") long orderId, Principal principal){

        orderService.deleteOrder(orderId, principal.getName());

        return new ResponseEntity<>(HttpStatus.OK);
    }


}
