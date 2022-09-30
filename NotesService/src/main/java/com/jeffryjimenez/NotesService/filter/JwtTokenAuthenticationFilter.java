package com.jeffryjimenez.NotesService.filter;

import com.jeffryjimenez.NotesService.utils.JwtConfig;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

public class JwtTokenAuthenticationFilter extends OncePerRequestFilter {

    private JwtConfig jwtConfig;

    public JwtTokenAuthenticationFilter(JwtConfig jwtConfig){
        this.jwtConfig = jwtConfig;
    }


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        //1. get the authentication header.
        String header = request.getHeader(jwtConfig.getHeader());

        //2. validate the token and check the prefix;
        if(header == null || !header.startsWith(jwtConfig.getPrefix())){
            filterChain.doFilter(request, response);
            return;
        }

        //3. get the token
        String token = header.replace(jwtConfig.getPrefix(), "").trim();

        try {

            //4. Validate token
            Claims claims = Jwts.parser()
                    .setSigningKey(jwtConfig.getSecret().getBytes())
                    .parseClaimsJws(token)
                    .getBody();

            String username = claims.getSubject();

            if(username != null){

                List<String> authorities = (List<String>) claims.get("authorities");

                //5. Create auth object
                UsernamePasswordAuthenticationToken auth =
                        new UsernamePasswordAuthenticationToken(username, null, authorities.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList()));

                SecurityContextHolder.getContext().setAuthentication(auth);
            }

        }catch (Exception e){

            // In case of failure. Make sure it's clear; so the user won't be authenticated
            SecurityContextHolder.clearContext();
        }

        filterChain.doFilter(request, response);
    }

}
