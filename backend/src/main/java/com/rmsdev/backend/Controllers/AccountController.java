package com.rmsdev.backend.Controllers;

import com.rmsdev.backend.DTOs.Requests.AnimeListDTO;
import com.rmsdev.backend.DTOs.Requests.EditAccountDTO;
import com.rmsdev.backend.DTOs.Responses.AccountListsResponseDTO;
import com.rmsdev.backend.DTOs.Responses.AnimeListResponseDTO;
import com.rmsdev.backend.DTOs.Responses.AccountResponseDTO;
import com.rmsdev.backend.Services.AccountService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/account")
public class AccountController {

    private final AccountService accountService;

    @GetMapping("/{accountId}")
    public ResponseEntity<AccountResponseDTO> getAccountById(@PathVariable String accountId) {
        var responseDTO = accountService.getAccountById(UUID.fromString(accountId));

        return ResponseEntity.ok(responseDTO);
    }

    @GetMapping("/{accountId}/lists")
    public ResponseEntity<AccountListsResponseDTO> getAccountListsById(@PathVariable String accountId) {
        var responseDTO = accountService.getAccountListsById(UUID.fromString(accountId));

        return ResponseEntity.ok(responseDTO);
    }

    @PostMapping("/{accountId}/lists")
    public ResponseEntity<AnimeListResponseDTO> createListByAccountId(@PathVariable String accountId, @Valid @RequestBody AnimeListDTO dto) {
        var responseDTO = accountService.createListByAccountId(UUID.fromString(accountId), dto);

        return ResponseEntity.ok(responseDTO);
    }

    @PutMapping("/{accountId}")
    public ResponseEntity<AccountResponseDTO> editAccountById(@PathVariable String accountId, @Valid @RequestBody EditAccountDTO dto) {
        var responseDTO = accountService.editAccountById(UUID.fromString(accountId), dto);

        return ResponseEntity.ok(responseDTO);
    }

    @DeleteMapping("/{accountId}")
    public ResponseEntity<Void> deleteAccountById(@PathVariable String accountId) {
        accountService.deleteAccountById(UUID.fromString(accountId));

        return ResponseEntity.ok().build();
    }
}
