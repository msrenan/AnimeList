package com.rmsdev.backend.Security;

import com.rmsdev.backend.Entities.Account;
import com.rmsdev.backend.Repositories.AccountRepository;
import com.rmsdev.backend.Utils.Exceptions.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService implements UserDetailsService {

    private final AccountRepository accountRepository;

    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        Account account = accountRepository.findFirstByNickIgnoreCaseOrderByIdAsc(login)
                .or(() -> accountRepository.findFirstByEmailIgnoreCaseOrderByIdAsc(login))
                .orElseThrow(() -> new ResourceNotFoundException("User " + login + " not found!"));

        return User.builder()
                .username(account.getEmail())
                .password(account.getPassword())
                .authorities("ROLE_USER")
                .build();
    }
}
