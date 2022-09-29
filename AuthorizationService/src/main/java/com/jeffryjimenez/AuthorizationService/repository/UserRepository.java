package com.jeffryjimenez.AuthorizationService.repository;

import com.jeffryjimenez.AuthorizationService.domain.Users;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<Users, Long> {

    List<Users> findAll();
    Optional<Users> findByUsername(String username);
    List<Users> findByUsernameIn(List<String> username);
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);

}
