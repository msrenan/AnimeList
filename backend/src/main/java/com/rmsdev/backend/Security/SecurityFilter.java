package com.rmsdev.backend.Security;

import com.rmsdev.backend.Repositories.AccountRepository;
import com.rmsdev.backend.Utils.Exceptions.BusinessException;
import com.rmsdev.backend.Utils.Exceptions.ResourceNotFoundException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class SecurityFilter extends OncePerRequestFilter {

    @Autowired
    private TokenService tokenService;

    @Autowired
    private AccountRepository accountRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        var token = recuperarToken(request);

        if (token != null) {
            var subject = tokenService.getSubject(token);

            var acc = accountRepository.findByEmail(subject).orElseThrow(() -> new ResourceNotFoundException("User not found!"));

            var account = org.springframework.security.core.userdetails.User.builder()
                    .username(acc.getEmail())
                    .password(acc.getPassword())
                    .authorities("ROLE_USER")
                    .build();

            var auth = new UsernamePasswordAuthenticationToken(account, null, account.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(auth);

        }

        filterChain.doFilter(request, response);
    }

    private String recuperarToken(HttpServletRequest request) {
        var authorizationHeader = request.getHeader("Authorization");
        if (authorizationHeader != null) {
            return authorizationHeader.replace("Bearer ", "");
        }
        return null;
    }

}
