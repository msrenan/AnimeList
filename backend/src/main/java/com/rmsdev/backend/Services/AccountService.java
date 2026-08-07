package com.rmsdev.backend.Services;

import com.rmsdev.backend.DTOs.Requests.AnimeListDTO;
import com.rmsdev.backend.DTOs.Requests.EditAccountDTO;
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

import static java.util.stream.Collectors.toList;

@Service
@RequiredArgsConstructor
@Slf4j
public class AccountService {

    private final AccountRepository accountRepository;
    private final AnimeRepository animeRepository;
    private final AnimeListRepository animeListRepository;

    public AccountResponseDTO getAccountById(UUID accountId) {
        log.info("Attempting to get account (id: {}) data!", accountId);
        Account acc = accountRepository.findById(accountId)
                .orElseThrow(() -> new ResourceNotFoundException("User (id: " + accountId + ") was not found"));

        log.info("Sending back data about {}'s account!", acc.getNick());
        return new AccountResponseDTO(acc);
    }

    public List<AnimeListResponseDTO> getAccountListsById(UUID accountId, String search) {
        log.info("Attempting to get account (id: {}) animeLists!", accountId);
        Account acc = accountRepository.findById(accountId)
                .orElseThrow(() -> new ResourceNotFoundException("User (id: " + accountId + ") was not found"));

        if (search != null && !search.trim().isEmpty()) {

            log.info("Searching for {} in {}'s animeLists", search, acc.getNick());

            List<AnimeList> searched = acc.getLists().stream().filter(list ->
                list.getName().toLowerCase().contains(search.toLowerCase())
            ).toList();

            log.info("Sending back results: {}", searched);

            return searched.stream().map(list -> new AnimeListResponseDTO(list)).toList();

        } else {
            log.info("Since there was no search query, sending back all {}'s {} animeList(s)!", acc.getNick(), acc.getLists().size());
            return acc.getLists().stream().map(list -> new AnimeListResponseDTO(list)).toList();
        }

    }

    public AnimeListResponseDTO createListByAccountId(UUID accountId, AnimeListDTO dto) {
        log.info("Attempting to create new animeList (name: {}) for account (id: {})!",dto.name() , accountId);
        if (dto.name().equalsIgnoreCase("favoritos")) {
            throw new BusinessException("List Favoritos already exists", HttpStatus.CONFLICT);
        }

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

        log.info("AnimeList created (with {} initial anime(s) ) successfully for {}!", saved.getAnimes().size(), acc.getNick());

        return new AnimeListResponseDTO(saved);

    }

    public AccountResponseDTO editAccountById(UUID accountId, EditAccountDTO dto) {
        log.info("Attempting to edit account (id: {})", accountId);
        Account acc = accountRepository.findById(accountId)
                .orElseThrow(() -> new ResourceNotFoundException("User (id: " + accountId + ") was not found"));

        log.info("Changes: {} -> {}", acc.getNick(), dto.nickname());

        if (dto.nickname() != null) {
            if (accountRepository.existsByNick(dto.nickname())) {
                throw new ConflictException("Nickname " + dto.nickname() + " is already in use by another account");
            }
            acc.setNick(dto.nickname());
        }

        Account newAcc = accountRepository.save(acc);
        log.info("Account edited successfully!");
        return new AccountResponseDTO(newAcc);
    }

    public void deleteAccountById(UUID accountId) {
        log.info("Attempting to delete account (id: {})", accountId);
        Account acc = accountRepository.findById(accountId)
                .orElseThrow(() -> new ResourceNotFoundException("User (id: " + accountId + ") was not found"));

        log.info("Deleting account! Nick: {}, Email: {}", acc.getNick(), acc.getEmail());

        accountRepository.deleteById(acc.getId());
    }
}
