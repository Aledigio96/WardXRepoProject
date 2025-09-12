package alessandro.digiovanni.demo.payloads;

import java.util.List;

public record SearchResultDTO(

        List<AnnuncioDTO> annunci,
        List<UserDTO> utenti
) {
}
