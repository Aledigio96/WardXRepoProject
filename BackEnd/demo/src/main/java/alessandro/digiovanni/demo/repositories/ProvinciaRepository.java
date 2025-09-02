package alessandro.digiovanni.demo.repositories;

import alessandro.digiovanni.demo.entities.Provincia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProvinciaRepository extends JpaRepository<Provincia, Long> {

    Optional<Provincia> findBySigla(String sigla);
}
