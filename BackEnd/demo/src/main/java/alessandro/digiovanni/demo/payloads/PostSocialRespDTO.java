package alessandro.digiovanni.demo.payloads;

import java.time.LocalDateTime;
import java.util.List;

public record PostSocialRespDTO(
        Long id,
        String content,
        LocalDateTime createdAt,
        UserPostSummary autore
) {}
