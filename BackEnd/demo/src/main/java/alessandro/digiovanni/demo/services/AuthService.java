package alessandro.digiovanni.demo.services;

import alessandro.digiovanni.demo.entities.User;
import alessandro.digiovanni.demo.exceptions.UnauthorisedException;
import alessandro.digiovanni.demo.payloads.LoginDTO;
import alessandro.digiovanni.demo.tools.JWTTools;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserService userService;

    @Autowired
    private JWTTools jwtTools;

    @Autowired
    private PasswordEncoder bCrypt;

    public String checkCredentialsAndGenerateToken(LoginDTO body) {
        User found = this.userService.findByEmail(body.email());

        if(bCrypt.matches(body.password(), found.getPassword())) {
            return jwtTools.createToken(found);
        } else {
            throw new UnauthorisedException("Credenziali errate!");
        }
    }

}