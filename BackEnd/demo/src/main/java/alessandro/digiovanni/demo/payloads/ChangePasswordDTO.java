package alessandro.digiovanni.demo.payloads;

import jakarta.validation.constraints.NotBlank;

public record ChangePasswordDTO(
        @NotBlank(message = "Devi inserire la password")
        String oldPassword,
        @NotBlank(message = "Inserisci la nuova password")
        String newPassword
) {}