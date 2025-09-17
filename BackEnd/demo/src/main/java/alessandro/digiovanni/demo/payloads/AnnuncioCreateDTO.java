package alessandro.digiovanni.demo.payloads;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public record AnnuncioCreateDTO(
        @NotBlank(message = "Il titolo è obbligatorio")
        String titolo,

        @NotBlank(message = "La descrizione è obbligatoria")
        String descrizione,

        @NotNull(message = "Il prezzo è obbligatorio")
        @PositiveOrZero(message = "Il prezzo deve essere maggiore o uguale a zero")
        Double prezzo,

        @NotBlank(message = "La taglia è obbligatoria")
        String taglia,

        @NotBlank(message = "Le condizioni sono obbligatorie")
        String condizioni,

        @NotNull(message = "Lo stato di disponibilità è obbligatorio")
        Boolean isAvailable,

        @NotBlank(message = "La categoria principale è obbligatoria")
        String categoriaPrincipale,

        @NotBlank(message = "La categoria è obbligatoria")
        String categoria


) {}