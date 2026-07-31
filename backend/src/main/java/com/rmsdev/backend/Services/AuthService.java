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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class AuthService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private AuthenticationManager manager;

    private final AccountRepository accountRepository;
    private final AnimeListRepository animeListRepository;

    public LoginResponseDTO register(RegisterDTO dto) {
        if (accountRepository.existsByEmail(dto.email()) || accountRepository.existsByNick(dto.nickname())) {
            throw new ConflictException("AccountController with email/username already registered!");
        }

        var encPass = passwordEncoder.encode(dto.password());

        Account newAcc = new Account(
                null,
                encPass,
                dto.email(),
                dto.nickname(),
                new ArrayList<>()
        );

        Account acc = accountRepository.save(newAcc);

        var token = tokenService.gerarToken(acc);

        AnimeList favorite = AnimeList.builder()
                .name("Favoritos")
                .owner(acc)
                .id(null)
                .animes(new ArrayList<>())
                .build();

        AnimeList savedList = animeListRepository.save(favorite);

        List<AnimeList> curr = acc.getLists();

        curr.add(savedList);

        acc.setLists(curr);

        accountRepository.save(acc);

        return new LoginResponseDTO(acc.getId(), token);
    }

    public LoginResponseDTO login(LoginDTO dto) {
        log.info("Buscando conta para o login: {}", dto.login());

        Account acc = accountRepository.findByNick(dto.login())
                .orElseGet(() -> accountRepository.findByEmail(dto.login())
                        .orElseThrow(() -> {
                            log.warn("Conta não encontrada para: {}", dto.login());
                            return new ResourceNotFoundException("AccountController with credential: " + dto.login() + " not found!");
                        }));

        var authToken = new UsernamePasswordAuthenticationToken(acc.getEmail(), dto.password());

        manager.authenticate(authToken);

        log.info("Conta autenticada com sucesso! ID: {}", acc.getId());

        var token = tokenService.gerarToken(acc);

        return new LoginResponseDTO(acc.getId(), token);
    }
}
