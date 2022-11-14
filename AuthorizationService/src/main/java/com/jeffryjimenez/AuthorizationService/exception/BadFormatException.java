package com.jeffryjimenez.AuthorizationService.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
public class BadFormatException extends RuntimeException{

    public BadFormatException(String resource){
        super(String.format("%s is not valid", resource));
    }

}
