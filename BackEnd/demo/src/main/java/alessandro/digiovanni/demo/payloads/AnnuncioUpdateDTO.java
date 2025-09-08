package alessandro.digiovanni.demo.payloads;

import java.util.List;

public record AnnuncioUpdateDTO(
        String titolo,
        String descrizione,
        Double prezzo,
        String taglia,
        String condizioni,
        Boolean isAvailable,
        String categoriaPrincipale,
        String categoria,
        List<String> imageUrls
) {}
