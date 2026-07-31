package com.rmsdev.backend.Security;


import com.rmsdev.backend.Entities.Account;
import com.rmsdev.backend.Repositories.AccountRepository;
import com.rmsdev.backend.Utils.Exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework. security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthenticationService implements UserDetailsService {

    @Autowired
    AccountRepository accountRepository;

    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        Account acc;
        if (accountRepository.existsByNick(login)) {
            acc = accountRepository.findByNick(login).orElseThrow(() -> new ResourceNotFoundException("User " + login + " not found!"));
        } else if (accountRepository.existsByEmail(login)) {
            acc = accountRepository.findByEmail(login).orElseThrow(() -> new ResourceNotFoundException("User " + login + " not found!"));
        } else {
            throw new ResourceNotFoundException("User " + login + " not found!");
        }

        return org.springframework.security.core.userdetails.User.builder()
                .username(acc.getEmail())
                .password(acc.getPassword())
                .authorities("ROLE_USER")
                .build();
    }
}
