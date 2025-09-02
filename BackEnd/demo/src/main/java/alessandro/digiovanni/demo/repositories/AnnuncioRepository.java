package alessandro.digiovanni.demo.repositories;

import alessandro.digiovanni.demo.entities.Annuncio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnnuncioRepository extends JpaRepository<Annuncio,Long> {
}

