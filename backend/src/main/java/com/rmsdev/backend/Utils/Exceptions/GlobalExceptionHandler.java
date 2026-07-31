package com.rmsdev.backend.Utils.Exceptions;

import com.rmsdev.backend.DTOs.ErrorMessageDTO;
import com.rmsdev.backend.DTOs.InvalidFieldDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.Instant;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ErrorMessageDTO> handleBusinessExcpetion(BusinessException error) {
        ErrorMessageDTO responseDTO = new ErrorMessageDTO(
                "An error has occurred!",
                error.getStatus().value(),
                error.getMessage(),
                Instant.now()
        );

        return ResponseEntity.status(error.getStatus()).body(responseDTO);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<InvalidFieldDTO> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> erros = new HashMap<>();

        // Percorre todos os campos que falharam na validação
        ex.getBindingResult().getFieldErrors().forEach(error -> {
            String campo = error.getField();
            String mensagem = error.getDefaultMessage(); // Pega a mensagem definida no DTO
            erros.put(campo, mensagem);
        });

        InvalidFieldDTO responseDTO = new InvalidFieldDTO(
                "Invalid Field(s)!",
                HttpStatus.BAD_REQUEST.value(),
                erros,
                Instant.now()
        );

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseDTO);
    }

}
