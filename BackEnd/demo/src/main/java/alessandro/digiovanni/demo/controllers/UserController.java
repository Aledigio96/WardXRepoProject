package alessandro.digiovanni.demo.controllers;

import alessandro.digiovanni.demo.entities.User;
import alessandro.digiovanni.demo.payloads.ChangePasswordDTO;
import alessandro.digiovanni.demo.payloads.UpdateUserDTO;
import alessandro.digiovanni.demo.payloads.UserResponseDTO;
import alessandro.digiovanni.demo.services.UserService;
import com.cloudinary.Cloudinary;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private Cloudinary cloudinary;



    @GetMapping("/profile")
    @PreAuthorize("isAuthenticated()")
    public UserResponseDTO getProfile(@AuthenticationPrincipal User user) {
        return new UserResponseDTO(
                user.getId(),
                user.getName(),
                user.getSurname(),
                user.getUsername(),
                user.getEmail(),
                user.getBio(),
                user.getAvatarUrl(),
                user.getRole().name(),
                user.getProvincia() != null ? user.getProvincia().getSigla() : null,
                user.getCreatedAt()
        );
    }

    @PutMapping("/profile")
    @PreAuthorize("isAuthenticated()")
    public UserResponseDTO updateProfile(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody UpdateUserDTO payload) {

        User updatedUser = userService.updateUser(user, payload);

        return new UserResponseDTO(
                updatedUser.getId(),
                updatedUser.getName(),
                updatedUser.getSurname(),
                updatedUser.getUsername(),
                updatedUser.getEmail(),
                updatedUser.getBio(),
                updatedUser.getAvatarUrl(),
                updatedUser.getRole().name(),
                updatedUser.getProvincia() != null ? updatedUser.getProvincia().getSigla() : null,
                updatedUser.getCreatedAt()
        );
    }

    @PostMapping("/change-password")
    @PreAuthorize("isAuthenticated()")
    public void changePassword(
            @AuthenticationPrincipal User user,
            @RequestBody @Valid ChangePasswordDTO payload) {

        userService.changePassword(user, payload.oldPassword(), payload.newPassword());
    }

    @PostMapping("/avatar")
    @PreAuthorize("isAuthenticated()")
    public String uploadAvatar(
            @AuthenticationPrincipal User user,
            @RequestParam("file") MultipartFile file) {

        return userService.uploadUserAvatar(user.getId(), file);
    }


    @GetMapping("/search")
    @PreAuthorize("isAuthenticated()")
    public List<UserResponseDTO> searchUsersByUsername(
            @RequestParam("username") String username,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size);

        Page<User> usersPage = userService.findUsersByUsername(username, pageable);

        return usersPage.stream()
                .map(user -> new UserResponseDTO(
                        user.getId(),
                        user.getName(),
                        user.getSurname(),
                        user.getUsername(),
                        user.getEmail(),
                        user.getBio(),
                        user.getAvatarUrl(),
                        user.getRole().name(),
                        user.getProvincia() != null ? user.getProvincia().getSigla() : null,
                        user.getCreatedAt()
                ))
                .toList();
    }
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<UserResponseDTO> getAllUsers(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<User> usersPage = userService.findAllUsers(pageable);

        return usersPage.stream()
                .map(user -> new UserResponseDTO(
                        user.getId(),
                        user.getName(),
                        user.getSurname(),
                        user.getUsername(),
                        user.getEmail(),
                        user.getBio(),
                        user.getAvatarUrl(),
                        user.getRole().name(),
                        user.getProvincia() != null ? user.getProvincia().getSigla() : null,
                        user.getCreatedAt()
                ))
                .toList();
    }
    @PutMapping("/{userId}/role")
    @PreAuthorize("hasRole('ADMIN')")
    public UserResponseDTO updateUserRole(
            @PathVariable Long userId,
            @RequestParam("role") String newRole) {

        User updatedUser = userService.updateUserRole(userId, newRole.toUpperCase());

        return new UserResponseDTO(
                updatedUser.getId(),
                updatedUser.getName(),
                updatedUser.getSurname(),
                updatedUser.getUsername(),
                updatedUser.getEmail(),
                updatedUser.getBio(),
                updatedUser.getAvatarUrl(),
                updatedUser.getRole().name(),
                updatedUser.getProvincia() != null ? updatedUser.getProvincia().getSigla() : null,
                updatedUser.getCreatedAt()
        );
    }
}