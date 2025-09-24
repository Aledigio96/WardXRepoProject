package alessandro.digiovanni.demo.payloads;

public record UpdateUserDTO(String name,
                            String surname,

                            String bio,
                            String avatarUrl,
                            String provinciaSigla)  {
}
