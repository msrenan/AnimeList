package com.rmsdev.backend.Security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.rmsdev.backend.Entities.Account;
import com.rmsdev.backend.Utils.Exceptions.BusinessException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Slf4j
@Service
public class TokenService {

    private final String secret;
    private final long expirationHours;

    public TokenService(@Value("${api.security.token.secret}") String secret,
                        @Value("${api.security.token.expiration-hours:6}") long expirationHours) {
        this.secret = secret;
        this.expirationHours = expirationHours;
    }

    public String generateToken(Account account) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);

            return JWT.create()
                    .withIssuer("AnimeListAPI")
                    .withSubject(account.getEmail())
                    .withExpiresAt(Instant.now().plus(expirationHours, ChronoUnit.HOURS))
                    .sign(algorithm);
        } catch (JWTCreationException e) {
            throw new IllegalStateException("Could not generate JWT", e);
        }
    }

    public String getSubject(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.require(algorithm)
                    .withIssuer("AnimeListAPI")
                    .build()
                    .verify(token)
                    .getSubject();
        } catch (JWTVerificationException e) {
            log.warn("Invalid/expired token");
            throw new BusinessException("Invalid/Expired Token!", HttpStatus.UNAUTHORIZED);
        }
    }
}
