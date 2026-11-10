package com.rmsdev.backend.Services;

import com.rmsdev.backend.DTOs.Requests.LoginDTO;
import com.rmsdev.backend.DTOs.Requests.RegisterDTO;
import com.rmsdev.backend.DTOs.Responses.LoginResponseDTO;
import com.rmsdev.backend.Entities.Account;
import com.rmsdev.backend.Entities.AnimeList;
import com.rmsdev.backend.Repositories.AccountRepository;
import com.rmsdev.backend.Repositories.AnimeListRepository;
import com.rmsdev.backend.Security.TokenService;
import com.rmsdev.backend.Utils.Exceptions.ConflictException;
import com.rmsdev.backend.Utils.Exceptions.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AuthService {

    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;
    private final AuthenticationManager manager;
    private final AccountRepository accountRepository;
    private final AnimeListRepository animeListRepository;

    @Transactional
    public LoginResponseDTO register(RegisterDTO dto) {
        String nickname = dto.nickname().trim();
        String email = dto.email().trim().toLowerCase();

        if (accountRepository.existsByEmailIgnoreCase(email)
                || accountRepository.existsByNickIgnoreCase(nickname)) {
            throw new ConflictException("Account with email/username already registered!");
        }

        Account newAccount = Account.builder()
                .password(passwordEncoder.encode(dto.password()))
                .email(email)
                .nick(nickname)
                .lists(new ArrayList<>())
                .build();

        Account account = accountRepository.save(newAccount);

        AnimeList favorites = AnimeList.builder()
                .name("Favoritos")
                .owner(account)
                .animes(new ArrayList<>())
                .build();

        animeListRepository.save(favorites);

        String token = tokenService.generateToken(account);
        log.info("Account (id: {}) '{}' registered", account.getId(), account.getNick());

        return new LoginResponseDTO(account.getId(), token);
    }

    public LoginResponseDTO login(LoginDTO dto) {
        String login = dto.login().trim();

        Account account = accountRepository.findFirstByNickIgnoreCaseOrderByIdAsc(login)
                .orElseGet(() -> accountRepository.findFirstByEmailIgnoreCaseOrderByIdAsc(login)
                        .orElseThrow(() -> new ResourceNotFoundException(
                                "Account with credential: " + login + " not found!")));

        var authToken = new UsernamePasswordAuthenticationToken(account.getEmail(), dto.password());
        manager.authenticate(authToken);

        String token = tokenService.generateToken(account);
        log.info("Account (id: {}) authenticated", account.getId());

        return new LoginResponseDTO(account.getId(), token);
    }
}
