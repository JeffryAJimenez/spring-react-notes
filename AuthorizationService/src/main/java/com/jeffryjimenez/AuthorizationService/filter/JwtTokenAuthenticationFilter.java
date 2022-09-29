package com.jeffryjimenez.AuthorizationService.filter;

import com.jeffryjimenez.AuthorizationService.config.JwtConfig;
import com.jeffryjimenez.AuthorizationService.service.JwtTokenProvider;
import com.jeffryjimenez.AuthorizationService.service.UserService;
import io.jsonwebtoken.Claims;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

public class JwtTokenAuthenticationFilter extends OncePerRequestFilter {

    private final JwtConfig jwtConfig;
    private JwtTokenProvider tokenProvider;
    private UserService userService;
    private String serviceUsername;

    public JwtTokenAuthenticationFilter(
            String serviceUsername,
            JwtConfig jwtConfig,
            JwtTokenProvider tokenProvider,
            UserService userService
    ){

        this.serviceUsername = serviceUsername;
        this.jwtConfig = jwtConfig;
        this.tokenProvider = tokenProvider;
        this.userService = userService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        //1. Get authentication header
        String header = request.getHeader(jwtConfig.getHeader());

        //2. validate header
        if(header == null || !header.startsWith(jwtConfig.getPrefix())){
            filterChain.doFilter(request, response);
            return;
        }

        //3. GET the token

        String token = header.replace(jwtConfig.getPrefix(), "").trim();

        if(tokenProvider.validateToken(token)){

            Claims claims = tokenProvider.getClaimsFromJWT(token);
            String username = claims.getSubject();

            UsernamePasswordAuthenticationToken auth = null;

            //if it is a service do not load user details
            if(username.equals(serviceUsername)){

                List<String> authorities = (List<String>) claims.get("authorities");

                auth = new UsernamePasswordAuthenticationToken(username, null, authorities.stream()
                        .map(SimpleGrantedAuthority::new).collect(Collectors.toList()));


            }else {

                auth = userService.findByUsername(username).map(userDetails -> {

                    UsernamePasswordAuthenticationToken authenticationToken =
                            new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

                    authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                    return authenticationToken;
                }).orElse(null);

                SecurityContextHolder.getContext().setAuthentication(auth);
            }

        }else{
            SecurityContextHolder.clearContext();
        }

        filterChain.doFilter(request, response);
    }
}
