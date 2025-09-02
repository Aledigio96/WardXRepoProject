package alessandro.digiovanni.demo.runners;

import alessandro.digiovanni.demo.entities.User;
import alessandro.digiovanni.demo.enums.Role;
import alessandro.digiovanni.demo.repositories.UserRepository;
import alessandro.digiovanni.demo.services.ProvinciaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.ArrayList;

@Component
public class CreatoreAdmin {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ProvinciaService provinciaService;

    public void createAdminIfNeeded() {
        String adminEmail = "admin@example.com";

        if (userRepository.findByEmail(adminEmail).isEmpty()) {
            User admin = new User();
            admin.setName("Alessandro");
            admin.setSurname("Di Giovanni");
            admin.setUsername("DiGio96");
            admin.setEmail(adminEmail);
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setBio("Amministratore del sistema");
            admin.setAvatarUrl(null);
            admin.setRole(Role.ADMIN);
            admin.setProvincia(provinciaService.findBySigla("RM").orElse(null));
            admin.setCreatedAt(LocalDateTime.now());
            admin.setAnnunci(new ArrayList<>());
            admin.setPosts(new ArrayList<>());
            admin.setCommenti(new ArrayList<>());

            userRepository.save(admin);
            System.out.println("Admin creato con successo (email: " + adminEmail + ")");
        } else {
            System.out.println("Admin già esistente, nessuna azione necessaria.");
        }
    }
}