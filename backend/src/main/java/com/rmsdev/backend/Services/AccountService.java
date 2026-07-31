package com.rmsdev.backend.Services;

import com.rmsdev.backend.DTOs.Requests.AnimeListDTO;
import com.rmsdev.backend.DTOs.Requests.EditAccountDTO;
import com.rmsdev.backend.DTOs.Responses.AccountListsResponseDTO;
import com.rmsdev.backend.DTOs.Responses.AnimeListResponseDTO;
import com.rmsdev.backend.DTOs.Responses.AccountResponseDTO;
import com.rmsdev.backend.Entities.Account;
import com.rmsdev.backend.Entities.Anime;
import com.rmsdev.backend.Entities.AnimeList;
import com.rmsdev.backend.Repositories.AccountRepository;
import com.rmsdev.backend.Repositories.AnimeListRepository;
import com.rmsdev.backend.Repositories.AnimeRepository;
import com.rmsdev.backend.Utils.Exceptions.BusinessException;
import com.rmsdev.backend.Utils.Exceptions.ConflictException;
import com.rmsdev.backend.Utils.Exceptions.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class AccountService {

    private final AccountRepository accountRepository;
    private final AnimeRepository animeRepository;
    private final AnimeListRepository animeListRepository;

    public AccountResponseDTO getAccountById(UUID accountId) {
        Account acc = accountRepository.findById(accountId)
                .orElseThrow(() -> new ResourceNotFoundException("User (id: " + accountId + ") was not found"));

        return new AccountResponseDTO(acc);
    }

    public AccountListsResponseDTO getAccountListsById(UUID accountId) {
        Account acc = accountRepository.findById(accountId)
                .orElseThrow(() -> new ResourceNotFoundException("User (id: " + accountId + ") was not found"));

        return new AccountListsResponseDTO(acc);
    }

    public AnimeListResponseDTO createListByAccountId(UUID accountId, AnimeListDTO dto) {

        Account acc = accountRepository.findById(accountId)
                .orElseThrow(() -> new ResourceNotFoundException("User (id: " + accountId + ") was not found"));

        List<AnimeList> currLists = acc.getLists();

        List<Anime> initialAnimes = new ArrayList<>();

        if (dto.animeIds() != null && !dto.animeIds().isEmpty()) {
            for (UUID animeId : dto.animeIds()) {
                try {
                    Anime anime = animeRepository.findById(animeId)
                            .orElseThrow(() -> new ResourceNotFoundException("Anime (id: " + animeId + ") was not found while creating animeList!"));

                    initialAnimes.add(anime);
                } catch (Exception e) {
                    log.warn("An error ocurred while creating a new animeList");
                    throw new BusinessException("Failed to create new AnimeList", HttpStatus.BAD_REQUEST);
                }
            }
        }

        AnimeList newList = AnimeList.builder()
                .id(null)
                .name(dto.name())
                .owner(acc)
                .animes(initialAnimes)
                .build();

        currLists.add(newList);

        AnimeList saved = animeListRepository.save(newList);

        acc.setLists(currLists);

        accountRepository.save(acc);

        return new AnimeListResponseDTO(saved);

    }

    public AccountResponseDTO editAccountById(UUID accountId, EditAccountDTO dto) {
        Account acc = accountRepository.findById(accountId)
                .orElseThrow(() -> new ResourceNotFoundException("User (id: " + accountId + ") was not found"));

        if (dto.nickname() != null) {
            if (accountRepository.existsByNick(dto.nickname())) {
                throw new ConflictException("Nickname " + dto.nickname() + " is already in use by another account");
            }
            acc.setNick(dto.nickname());
        }

        Account newAcc = accountRepository.save(acc);
        return new AccountResponseDTO(newAcc);
    }

    public void deleteAccountById(UUID accountId) {
        Account acc = accountRepository.findById(accountId)
                .orElseThrow(() -> new ResourceNotFoundException("User (id: " + accountId + ") was not found"));

        accountRepository.deleteById(acc.getId());
    }
}
