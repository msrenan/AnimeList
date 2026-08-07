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
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Slf4j
@Service
public class TokenService {

    @Value("${api.security.token.secret}")
    private String secret;

    public String gerarToken(Account account) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);

            return JWT.create().withIssuer("AnimeListAPI").withSubject(account.getEmail())
                    .withExpiresAt(dataExpiracao()).sign(algorithm);
        } catch (JWTCreationException e) {
            throw new RuntimeException("Erro ao gerar JWT: ", e);
        }
    }

    private Instant dataExpiracao() {
        return LocalDateTime.now().plusHours(6).toInstant(ZoneOffset.of("-03:00"));
    }

    public String getSubject(String token) {
        try {
            Algorithm alg = Algorithm.HMAC256(secret);
            return JWT.require(alg).withIssuer("AnimeListAPI").build().verify(token).getSubject();
        } catch (JWTVerificationException e) {
            log.warn("Invalid/Expired Token!");
            throw new BusinessException("Invalid/Expired Token!", HttpStatus.UNAUTHORIZED);
        }
    }
}
