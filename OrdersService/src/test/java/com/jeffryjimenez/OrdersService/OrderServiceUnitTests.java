package com.jeffryjimenez.OrdersService;

import com.jeffryjimenez.OrdersService.domain.Order;
import com.jeffryjimenez.OrdersService.exception.BadRequestException;
import com.jeffryjimenez.OrdersService.exception.ForbiddenException;
import com.jeffryjimenez.OrdersService.exception.ResourceNotFoundException;
import com.jeffryjimenez.OrdersService.repository.OrderRepository;
import com.jeffryjimenez.OrdersService.service.OrderService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.AdditionalAnswers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class OrderServiceUnitTests {

    @Mock
    private OrderRepository orderRepository;

    @InjectMocks
    private OrderService orderService;

    @Test
    @DisplayName("GET ALL ORDERS BY CREATOR")
    public void testGetAllByCreator(){

        String creator = "JOHN";

        Pageable pageable = PageRequest.of(0, 1 );
        List<Order> list = List.of(
                new Order(creator, 23.10),
                new Order(creator, 25.23),
                new Order(creator, 20.06)
        );

        Page<Order> expected = new PageImpl<>(list, pageable, 3L);

        when(orderRepository.findAllByCreator(anyString(), any(Pageable.class)))
                .thenReturn(expected);

        Page<Order> actual = orderService.getAllByCreator(creator, pageable);

        assertEquals(expected, actual);

    }

    @Test
    @DisplayName("CREATE ORDER INVALID")
    public void testCreateOrder_INVALID_TOTAL(){

        String creator = "JOHN";
        Order order1 = new Order(creator, 67000.01);
        Order order2 = new Order(creator, -0.01);

        assertThrows(BadRequestException.class, () -> orderService.createOrder(order1, creator));
        assertThrows(BadRequestException.class, () -> orderService.createOrder(order2, creator));
    }

    @Test
    @DisplayName("CREATE ORDER SUCCESS")
    public void testCreateOrder_SUCCESS() {

        String creator = "JOHN";
        LocalDate localDate = LocalDate.now();
        LocalTime localTime = LocalTime.now();

        Order expected = new Order();
        expected.setCreator(creator);
        expected.setTotal(19.29);
        expected.setCreatedDate(localDate);
        expected.setCreatedTime(localTime);

        Order arg = new Order();
        arg.setTotal(19.29);
        arg.setCreatedDate(localDate);

        when(orderRepository.save(any(Order.class)))
                .then(AdditionalAnswers.returnsFirstArg());

        Order actual = orderService.createOrder(arg, creator);

        assertEquals(expected.getCreator(), actual.getCreator());
        assertEquals(expected.getTotal(), actual.getTotal());
        assertEquals(expected.getCreatedDate(), actual.getCreatedDate());

    }

    @Test
    @DisplayName("DELETE ORDER SUCCESS")
    public void testDeleteOrder_SUCCESS() {

        long orderId = 1L;
        String creator = "JOHN";

        Order obj = new Order();
        obj.setId(orderId);
        obj.setCreator(creator);
        obj.setTotal(19.29);

        when(orderRepository.findById(anyLong()))
                .thenReturn(Optional.of(obj));

        assertDoesNotThrow(() -> orderService.deleteOrder(orderId, creator));

    }

    @Test
    @DisplayName("DELETE ORDER NOT FOUND")
    public void testDeleteOrder_NOT_FOUND() {

        long orderId = 1L;
        String creator = "JOHN";

        when(orderRepository.findById(anyLong()))
                .thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> orderService.deleteOrder(orderId, creator));

    }

    @Test
    @DisplayName("DELETE ORDER NOT ALLOWED")
    public void testDeleteOrder_NOT_ALLOWED() {

        long orderId = 1L;
        String creator = "JOHN";
        String attacker1 = "JASON";
        String attacker2 = "";
        String attacker3 = " ";
        String attacker4 = "JOHN ";


        Order obj = new Order();
        obj.setId(orderId);
        obj.setCreator(creator);
        obj.setTotal(19.29);

        when(orderRepository.findById(anyLong()))
                .thenReturn(Optional.of(obj));

        assertThrows(ForbiddenException.class, () -> orderService.deleteOrder(orderId, attacker1));
        assertThrows(ForbiddenException.class, () -> orderService.deleteOrder(orderId, attacker2));
        assertThrows(ForbiddenException.class, () -> orderService.deleteOrder(orderId, attacker3));
        assertThrows(ForbiddenException.class, () -> orderService.deleteOrder(orderId, attacker4));
        assertThrows(ForbiddenException.class, () -> orderService.deleteOrder(orderId, null));

    }
}
