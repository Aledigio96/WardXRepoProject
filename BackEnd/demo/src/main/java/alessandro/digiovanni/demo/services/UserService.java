package alessandro.digiovanni.demo.services;

import alessandro.digiovanni.demo.entities.Provincia;
import alessandro.digiovanni.demo.entities.User;
import alessandro.digiovanni.demo.enums.Role;
import alessandro.digiovanni.demo.exceptions.BadRequestException;
import alessandro.digiovanni.demo.exceptions.NotFoundException;
import alessandro.digiovanni.demo.payloads.NewUserDTO;
import alessandro.digiovanni.demo.payloads.UpdateUserDTO;
import alessandro.digiovanni.demo.repositories.UserRepository;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder bcrypt;
    @Autowired
    private ProvinciaService provinciaService;
    @Autowired
    private Cloudinary cloudinary;

    public User findById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Utente non trovato con ID: " + id));
    }
    public User findByEmail(String email){
        return this.userRepository.findByEmail(email).orElseThrow(() -> new NotFoundException(email));
    }
    public Page<User> findUsersByUsername(String username, Pageable pageable) {
        return userRepository.findByUsernameContainingIgnoreCase(username, pageable);
    }
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
    public Page<User> findAllUsers(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    public User registerNewUser(NewUserDTO payload) {
        userRepository.findByEmail(payload.email()).ifPresent(u -> {
            throw new BadRequestException("Email già in uso");
        });

        Provincia provincia = provinciaService.findBySigla(payload.provinciaSigla())
                .orElseThrow(() -> new NotFoundException("Provincia non trovata"));

        User newUser = new User(
                payload.name(),
                payload.surname(),
                payload.username(),
                payload.email(),
                bcrypt.encode(payload.password()),
                null,
                null,
                Role.USER,
                provincia,
                LocalDateTime.now(),
                new ArrayList<>(),
                new ArrayList<>(),
                new ArrayList<>(),
                null
        );

        return userRepository.save(newUser);
    }
    public User updateUser(User user, UpdateUserDTO payload) {
        if (payload.name() != null) user.setName(payload.name());
        if (payload.surname() != null) user.setSurname(payload.surname());
        if (payload.bio() != null) user.setBio(payload.bio());

        if (payload.provinciaSigla() != null) {
            Provincia provincia = provinciaService.findBySigla(payload.provinciaSigla())
                    .orElseThrow(() -> new NotFoundException("Provincia non trovata"));
            user.setProvincia(provincia);
        }

        return userRepository.save(user);
    }
    public void changePassword(User user, String oldPassword, String newPassword) {
        if (!bcrypt.matches(oldPassword, user.getPassword())) {
            throw new BadRequestException("Vecchia password errata");
        }
        user.setPassword(bcrypt.encode(newPassword));
        userRepository.save(user);
    }
    public String uploadUserAvatar(Long userId, MultipartFile file) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("Utente non trovato con ID: " + userId));

        try {
            String imageUrl = (String) cloudinary.uploader()
                    .upload(file.getBytes(), ObjectUtils.emptyMap())
                    .get("url");

            user.setAvatarUrl(imageUrl);
            userRepository.save(user);

            return imageUrl;

        } catch (IOException e) {
            throw new BadRequestException("Errore durante il caricamento dell'immagine");
        }
    }
    public User updateUserRole(Long userId, String newRole) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("Utente non trovato con ID: " + userId));

        Role roleEnum;
        try {
            roleEnum = Role.valueOf(newRole);
        } catch (IllegalArgumentException e) {
            throw new BadRequestException("Ruolo non valido: " + newRole);
        }

        user.setRole(roleEnum);
        return userRepository.save(user);
    }
}