package alessandro.digiovanni.demo.payloads;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UpdateUserChangeDTO(
        @NotBlank(message = "Il nome non può essere vuoto")
        @Size(max = 50, message = "Il nome deve contenere al massimo 50 caratteri")
        String name,

        @NotBlank(message = "Il cognome non può essere vuoto")
        @Size(max = 50, message = "Il cognome deve contenere al massimo 50 caratteri")
        String surname,

        @NotBlank(message = "L'username non può essere vuoto")
        @Size(min = 3, max = 20, message = "L'username deve avere tra 3 e 20 caratteri")
        String username,

        @NotBlank(message = "L'email non può essere vuota")
        @Email(message = "Email non valida")
        String email,

        @Size(max = 250, message = "La bio può contenere al massimo 250 caratteri")
        String bio,

        @Size(min = 2, max = 2, message = "La sigla della provincia deve contenere 2 caratteri")
        String provinciaSigla
) {
}
