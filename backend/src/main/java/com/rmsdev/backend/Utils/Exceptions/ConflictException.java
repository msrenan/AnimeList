package com.rmsdev.backend.Utils.Exceptions;

import org.springframework.http.HttpStatus;

public class ConflictException extends BusinessException{

    public ConflictException(String message) {
        super(message, HttpStatus.CONFLICT);
    }

}
