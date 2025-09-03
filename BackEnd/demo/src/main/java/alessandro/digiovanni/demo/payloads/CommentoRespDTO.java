package alessandro.digiovanni.demo.payloads;

import java.time.LocalDateTime;

public record CommentoRespDTO(
        Long id,
        String testo,
        LocalDateTime createdAt,
        Long postId,
        Long userId
) {
}