package alessandro.digiovanni.demo.payloads;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record NewUserDTO(@NotBlank(message = "Il nome è obbligatorio!")
                         String name,

                         @NotBlank(message = "Il cognome è obbligatorio!")
                         String surname,

                         @NotBlank(message = "L'username è obbligatorio")
                         @Size(min = 2,max = 20,message = "Lo username deve essere compreso tra i 2 e i 20 caratteri!")
                         String username,

                         @NotBlank(message = "L'email è obbligatoria!")
                         @Email(message = "Formato non corretto")
                         String email,

                         @NotBlank(message = "La password è obbligatoria")
                         String password,

                         @NotBlank(message = "La sigla della provincia è obbligatoria")
                         String provinciaSigla


) {
}