package com.rmsdev.backend.Services;

import com.rmsdev.backend.DTOs.Requests.AnimeListDTO;
import com.rmsdev.backend.DTOs.Requests.EditAccountDTO;
import com.rmsdev.backend.DTOs.Responses.AccountResponseDTO;
import com.rmsdev.backend.DTOs.Responses.AnimeListResponseDTO;
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
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class AccountService {

    private static final String DEFAULT_LIST = "Favoritos";

    private final AccountRepository accountRepository;
    private final AnimeRepository animeRepository;
    private final AnimeListRepository animeListRepository;

    public AccountResponseDTO getAccountById(UUID accountId) {
        Account acc = accountRepository.findById(accountId)
                .orElseThrow(() -> new ResourceNotFoundException("User (id: " + accountId + ") was not found"));

        return new AccountResponseDTO(acc);
    }

    public List<AnimeListResponseDTO> getAccountListsById(UUID accountId, String search) {
        if (!accountRepository.existsById(accountId)) {
            throw new ResourceNotFoundException("User (id: " + accountId + ") was not found");
        }

        List<AnimeList> lists = search != null && !search.trim().isEmpty()
                ? animeListRepository.findByOwnerIdAndNameContainingIgnoreCaseOrderByNameAsc(accountId, search.trim())
                : animeListRepository.findByOwnerIdOrderByNameAsc(accountId);

        return lists.stream().map(AnimeListResponseDTO::new).toList();
    }

    @Transactional
    public AnimeListResponseDTO createListByAccountId(UUID accountId, AnimeListDTO dto) {
        String listName = dto.name().trim();

        if (listName.equalsIgnoreCase(DEFAULT_LIST)) {
            throw new BusinessException("List Favoritos already exists", HttpStatus.CONFLICT);
        }

        Account acc = accountRepository.findById(accountId)
                .orElseThrow(() -> new ResourceNotFoundException("User (id: " + accountId + ") was not found"));

        if (animeListRepository.existsByOwnerIdAndNameIgnoreCase(accountId, listName)) {
            throw new ConflictException("A list named " + listName + " already exists for this account");
        }

        List<Anime> initialAnimes = new ArrayList<>();
        if (dto.animeIds() != null && !dto.animeIds().isEmpty()) {
            initialAnimes = animeRepository.findAllById(dto.animeIds());
            if (initialAnimes.size() != dto.animeIds().size()) {
                throw new BusinessException("Failed to create new AnimeList: one or more animes were not found",
                        HttpStatus.BAD_REQUEST);
            }
        }

        AnimeList newList = AnimeList.builder()
                .name(listName)
                .owner(acc)
                .animes(initialAnimes)
                .build();

        AnimeList saved = animeListRepository.save(newList);
        log.info("AnimeList '{}' created with {} initial anime(s) for account '{}'",
                saved.getName(), saved.getAnimes().size(), acc.getNick());

        return new AnimeListResponseDTO(saved);
    }

    @Transactional
    public AccountResponseDTO editAccountById(UUID accountId, EditAccountDTO dto) {
        Account acc = accountRepository.findById(accountId)
                .orElseThrow(() -> new ResourceNotFoundException("User (id: " + accountId + ") was not found"));

        if (dto.nickname() != null) {
            String nickname = dto.nickname().trim();
            if (!nickname.equalsIgnoreCase(acc.getNick())
                    && accountRepository.existsByNickIgnoreCase(nickname)) {
                throw new ConflictException("Nickname " + nickname + " is already in use by another account");
            }
            acc.setNick(nickname);
        }

        Account saved = accountRepository.save(acc);
        log.info("Account (id: {}) updated", saved.getId());
        return new AccountResponseDTO(saved);
    }

    @Transactional
    public void deleteAccountById(UUID accountId) {
        Account acc = accountRepository.findById(accountId)
                .orElseThrow(() -> new ResourceNotFoundException("User (id: " + accountId + ") was not found"));

        accountRepository.delete(acc);
        log.info("Account (id: {}) '{}' deleted", accountId, acc.getNick());
    }
}
