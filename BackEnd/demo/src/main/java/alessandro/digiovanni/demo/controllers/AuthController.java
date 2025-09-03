package alessandro.digiovanni.demo.controllers;

import alessandro.digiovanni.demo.entities.User;
import alessandro.digiovanni.demo.payloads.LoginDTO;
import alessandro.digiovanni.demo.payloads.LoginRespDTO;
import alessandro.digiovanni.demo.payloads.NewUserDTO;
import alessandro.digiovanni.demo.services.AuthService;
import alessandro.digiovanni.demo.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public LoginRespDTO login(@RequestBody LoginDTO body) {
        String accessToken = authService.checkCredentialsAndGenerateToken(body);
        return new LoginRespDTO(accessToken);
    }
    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public User register(@Valid @RequestBody NewUserDTO newUserDTO) {
        return userService.registerNewUser(newUserDTO);
    }

}