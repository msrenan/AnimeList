package com.rmsdev.backend.Repositories;

import com.rmsdev.backend.Entities.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface AccountRepository extends JpaRepository<Account, UUID> {

    Optional<Account> findFirstByEmailIgnoreCaseOrderByIdAsc(String email);

    Optional<Account> findFirstByNickIgnoreCaseOrderByIdAsc(String nick);

    boolean existsByEmailIgnoreCase(String email);

    boolean existsByNickIgnoreCase(String nick);
}
