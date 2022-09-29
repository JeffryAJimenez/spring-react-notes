package com.jeffryjimenez.AuthorizationService;

import com.jeffryjimenez.AuthorizationService.integration.controller.UserControllerIntegrationTest;
import com.jeffryjimenez.AuthorizationService.integration.service.JwtTokenProviderIntegrationTest;
import com.jeffryjimenez.AuthorizationService.unit.service.UserServiceUnitTest;
import org.junit.jupiter.api.Test;
import org.junit.runners.Suite;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class AuthorizationServiceApplicationTests {

	@Test
	void contextLoads() {
	}

}
