package com.jeffryjimenez.OrdersService.filters;


import com.jeffryjimenez.OrdersService.utils.JwtConfig;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;


public class JwtTokenAuthenticatorFilter extends OncePerRequestFilter {


    private JwtConfig jwtConfig;

    public JwtTokenAuthenticatorFilter(JwtConfig jwtConfig){
        this.jwtConfig = jwtConfig;
    }


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        //1. GET HEADER
        String header = request.getHeader(jwtConfig.getHeader());


        //2. VALIDATE THE TOKEN AND CHECK THE PREFIX
        if(header == null || !header.startsWith(jwtConfig.getPrefix())){
            filterChain.doFilter(request, response);
            return;
        }

        //3. GET TOKEN
        String token = header.replace(jwtConfig.getPrefix(), "").trim();

        try {
            //4. VALIDATE TOKEN
            Claims claims = Jwts.parser().setSigningKey(jwtConfig.getSecret().getBytes())
                    .parseClaimsJws(token)
                    .getBody();

            String username = claims.getSubject();

            if(username != null) {

                List<String> authorities = (List<String>) claims.get("authorities");

                //5. CREATE AUTHENTICATION OBJECT
                UsernamePasswordAuthenticationToken auth =
                        new UsernamePasswordAuthenticationToken(username, null, authorities.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList()));

                SecurityContextHolder.getContext().setAuthentication(auth);
            }

        }catch (Exception e){

            //IN CASE OF FAILURE MAKE SURE THE CONTEXT IS CLEAR
            SecurityContextHolder.clearContext();
        }

        filterChain.doFilter(request, response);
    }
}
