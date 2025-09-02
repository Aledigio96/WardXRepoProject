package alessandro.digiovanni.demo.repositories;

import alessandro.digiovanni.demo.entities.Ordine;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrdineRepository extends JpaRepository<Ordine, Long> {
    List<Ordine> findByUserId(Long userId);
}