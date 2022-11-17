package com.jeffryjimenez.AuthorizationService.messaging;

import com.jeffryjimenez.AuthorizationService.domain.Users;

public interface UserMessagingService {

    public void sendUsernameChanged(String oldUser, String newUser);
    public void sendUserUpdated(Users user);

}
