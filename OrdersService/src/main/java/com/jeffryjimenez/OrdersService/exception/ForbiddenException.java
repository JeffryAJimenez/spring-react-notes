package com.jeffryjimenez.OrdersService.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class ForbiddenException extends RuntimeException{

    public ForbiddenException(String id){

        super(String.format("Not allowed to modify resource %s not found", id));
    }
}
