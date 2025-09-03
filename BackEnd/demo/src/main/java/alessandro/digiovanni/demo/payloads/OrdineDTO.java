package alessandro.digiovanni.demo.payloads;

import alessandro.digiovanni.demo.enums.StatoOrdine;

import java.time.LocalDateTime;
import java.util.List;

public record OrdineDTO(
        Long id,
        LocalDateTime dataOrdine,
        StatoOrdine stato,
        Long userId,
        List<Long> annunciIds
) {}