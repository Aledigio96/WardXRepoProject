package alessandro.digiovanni.demo.payloads;

public record UserDTO(
         Long id,
         String username,
         String name,
         String surname,
         String avatarUrl
) {
}
