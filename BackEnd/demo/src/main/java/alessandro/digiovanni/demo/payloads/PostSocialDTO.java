package alessandro.digiovanni.demo.payloads;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record PostSocialDTO(
        @NotBlank(message = "Il contenuto non può essere vuoto")
        String content,

        List<String> imageUrls,

        @NotNull(message = "L'autore è obbligatorio")
        Long autoreId
) {}