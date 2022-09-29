package com.jeffryjimenez.AuthorizationService.messaging;

import com.jeffryjimenez.AuthorizationService.domain.Users;

public interface UserMessagingService {

    public void sendUserCreated(Users user);
    public void sendUserUpdated(Users user);

}
