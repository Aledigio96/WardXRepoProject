package alessandro.digiovanni.demo.payloads;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CommentoDTO(

        @NotBlank(message = "Il testo non può essere vuoto")
        String testo,

        @NotNull(message = "postId è obbligatorio")
        Long postId,

        @NotNull(message = "userId è obbligatorio")
        Long userId
) {
}