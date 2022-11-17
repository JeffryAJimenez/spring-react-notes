package com.jeffryjimenez.OrdersService.repository;

import com.jeffryjimenez.OrdersService.domain.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface OrderRepository extends CrudRepository<Order, Long> {

    Page<Order> findAllByCreator(String creator, Pageable pageable);

    @Modifying
    @Transactional
    @Query("UPDATE Order o SET o.creator = :newCreator WHERE o.creator = :oldCreator ")
    int updateOrderCreatorByCreator(@Param(value = "oldCreator") String oldCreator, @Param(value = "newCreator") String newCreator);

    @Query("SELECT COUNT(o) FROM Order o WHERE o.creator = :creator")
    public long countOfOrdersByUsername(@Param(value = "creator") String creator);

    @Query("SELECT COALESCE( SUM(o.total), 0.0 )FROM Order o WHERE o.creator = :creator")
    public double totalSumByUsername(@Param(value = "creator") String creator);
}
