package com.rmsdev.backend.Controllers;

import com.rmsdev.backend.DTOs.Requests.AnimeListDTO;
import com.rmsdev.backend.DTOs.Requests.EditAccountDTO;
import com.rmsdev.backend.DTOs.Responses.AccountResponseDTO;
import com.rmsdev.backend.DTOs.Responses.AnimeListResponseDTO;
import com.rmsdev.backend.Services.AccountService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/account")
public class AccountController {

    private final AccountService accountService;

    @GetMapping("/{accountId}")
    public ResponseEntity<AccountResponseDTO> getAccountById(@PathVariable UUID accountId) {
        return ResponseEntity.ok(accountService.getAccountById(accountId));
    }

    @GetMapping("/{accountId}/lists")
    public ResponseEntity<List<AnimeListResponseDTO>> getAccountListsById(
            @PathVariable UUID accountId,
            @RequestParam(required = false) String search) {
        return ResponseEntity.ok(accountService.getAccountListsById(accountId, search));
    }

    @PostMapping("/{accountId}/lists")
    public ResponseEntity<AnimeListResponseDTO> createListByAccountId(
            @PathVariable UUID accountId,
            @Valid @RequestBody AnimeListDTO dto) {
        return ResponseEntity.ok(accountService.createListByAccountId(accountId, dto));
    }

    @PutMapping("/{accountId}")
    public ResponseEntity<AccountResponseDTO> editAccountById(
            @PathVariable UUID accountId,
            @Valid @RequestBody EditAccountDTO dto) {
        return ResponseEntity.ok(accountService.editAccountById(accountId, dto));
    }

    @DeleteMapping("/{accountId}")
    public ResponseEntity<Void> deleteAccountById(@PathVariable UUID accountId) {
        accountService.deleteAccountById(accountId);
        return ResponseEntity.ok().build();
    }
}
