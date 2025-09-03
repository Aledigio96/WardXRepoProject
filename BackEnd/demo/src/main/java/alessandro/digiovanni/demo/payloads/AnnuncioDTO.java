package alessandro.digiovanni.demo.payloads;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

import java.util.List;

public record AnnuncioDTO(
        Long id,

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

        @NotBlank(message = "La categoria è obbligatoria")
        String categoria,

        @NotNull(message = "Le immagini non possono essere nulle")
        List<@NotBlank(message = "L'url dell'immagine non può essere vuoto") String> imageUrls,

        @NotNull(message = "Lo sellerId è obbligatorio")
        Long sellerId
) {}