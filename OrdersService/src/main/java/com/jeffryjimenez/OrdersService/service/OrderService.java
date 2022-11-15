package com.jeffryjimenez.OrdersService.service;

import com.jeffryjimenez.OrdersService.domain.Order;
import com.jeffryjimenez.OrdersService.exception.BadRequestException;
import com.jeffryjimenez.OrdersService.exception.ForbiddenException;
import com.jeffryjimenez.OrdersService.exception.ResourceNotFoundException;
import com.jeffryjimenez.OrdersService.repository.OrderRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Optional;

@Service
public class OrderService {

    private OrderRepository orderRepo;

    public OrderService(OrderRepository orderRepo){
        this.orderRepo = orderRepo;
    }

    public Page<Order> getAllByCreator(String creator, Pageable pageable){

        return  orderRepo.findAllByCreator(creator,pageable);
    }

    public int updateCreator( String oldCreator, String newCreator){
        return orderRepo.updateOderCreatorByCreator(oldCreator, newCreator);
    }


    //TODO WRITE TESTS AND THROW EXCEPTIONS
    public double totalSumByUsername(String username){

        return orderRepo.totalSumByUsername(username);

    }

    //TODO WRITE TESTS AND THROW EXCEPTIONS
    public long countOfOrdersByUsername(String username){

        return orderRepo.countOfOrdersByUsername(username);

    }

    public Order createOrder(Order order, String creator) {

        double maxTotal = 67000.00;

        if(order.getTotal() > maxTotal || order.getTotal() <= 0 ) {
            throw new BadRequestException("Maximum total amount exceeded");
        }

        LocalDate localDate = LocalDate.now();
        LocalTime localTime = LocalTime.now();

        order.setCreatedDate(localDate);
        order.setCreatedTime(localTime);

        order.setCreator(creator);
        return orderRepo.save(order);
    }

    public void deleteOrder(long orderId, String creator){

        Optional<Order> orderOptional =  orderRepo.findById(orderId);

        if(orderOptional.isEmpty()){
            throw new ResourceNotFoundException(String.valueOf(orderId));
        }

        Order order = orderOptional.get();

        if(!order.getCreator().equals(creator)){
            throw  new ForbiddenException(String.valueOf(orderId));
        }

        orderRepo.delete(order);

        return;
    }
}
