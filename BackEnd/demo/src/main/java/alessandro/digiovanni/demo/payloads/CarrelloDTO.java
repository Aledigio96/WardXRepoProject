package alessandro.digiovanni.demo.payloads;

import java.util.List;

public record CarrelloDTO(
        Long id,
        Long userId,
        List<Long> annunciIds) {
}