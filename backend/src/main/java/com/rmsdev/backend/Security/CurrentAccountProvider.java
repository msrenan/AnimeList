package com.rmsdev.backend.Security;

import com.rmsdev.backend.Entities.Account;
import com.rmsdev.backend.Repositories.AccountRepository;
import com.rmsdev.backend.Utils.Exceptions.BusinessException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

/**
 * Resolve a conta autenticada a partir do token JWT.
 */
@Component
@RequiredArgsConstructor
public class CurrentAccountProvider {

    private final AccountRepository accountRepository;

    public Account get() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()
                || "anonymousUser".equals(authentication.getName())) {
            throw new BusinessException("Authentication is required!", HttpStatus.UNAUTHORIZED);
        }

        return accountRepository.findFirstByEmailIgnoreCaseOrderByIdAsc(authentication.getName())
                .orElseThrow(() -> new BusinessException("Authenticated account was not found!", HttpStatus.UNAUTHORIZED));
    }
}
