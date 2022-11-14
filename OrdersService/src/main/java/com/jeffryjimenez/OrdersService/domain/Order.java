package com.jeffryjimenez.OrdersService.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;

@Data
@Entity
@Table(name = "Orders")
@NoArgsConstructor
@AllArgsConstructor
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String creator;

//    @NotBlank
    private double total;

    private LocalDate createdDate;

    private LocalTime createdTime;


    public Order(String creator, double total){
        this.creator = creator;
        this.total = total;
    }
}
