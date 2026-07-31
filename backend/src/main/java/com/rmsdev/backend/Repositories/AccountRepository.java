package com.rmsdev.backend.Repositories;

import com.rmsdev.backend.Entities.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface AccountRepository extends JpaRepository<Account, UUID> {

    Optional<Account> findByEmail(String email);

    boolean existsByEmail(String email);
    boolean existsByNick(String nick);

    Optional<Account> findByNick(String nick);
}
