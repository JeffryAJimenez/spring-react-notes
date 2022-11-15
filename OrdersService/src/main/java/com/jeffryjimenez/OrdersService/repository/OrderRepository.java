package com.jeffryjimenez.OrdersService.repository;

import com.jeffryjimenez.OrdersService.domain.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends CrudRepository<Order, Long> {

    Page<Order> findAllByCreator(String creator, Pageable pageable);

    @Modifying
    @Query("UPDATE Order o SET o.creator = :newCreator WHERE o.creator = :oldCreator ")
    int updateOderCreatorByCreator(@Param(value = "oldCreator") String oldCreator, @Param(value = "newCreator") String newCreator);

    @Query("SELECT COUNT(o) FROM Order o WHERE o.creator = :creator")
    public long countOfOrdersByUsername(@Param(value = "creator") String creator);

    @Query("SELECT SUM(o.total) FROM Order o WHERE o.creator = :creator")
    public double totalSumByUsername(@Param(value = "creator") String creator);
}
