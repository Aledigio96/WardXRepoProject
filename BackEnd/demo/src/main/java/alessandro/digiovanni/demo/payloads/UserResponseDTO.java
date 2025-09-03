package alessandro.digiovanni.demo.payloads;

import java.time.LocalDateTime;

public record UserResponseDTO(
        Long id,
        String name,
        String surname,
        String username,
        String email,
        String bio,
        String avatarUrl,
        String role,
        String provinciaSigla,
        LocalDateTime createdAt
) {}