package alessandro.digiovanni.demo.repositories;

import alessandro.digiovanni.demo.entities.Annuncio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnnuncioRepository extends JpaRepository<Annuncio,Long> {
    List<Annuncio> findBySellerUsername(String username);
    @Query(value =
            "SELECT * FROM annunci a " +
                    "WHERE LOWER(a.titolo) LIKE LOWER(CONCAT('%', :query, '%')) " +
                    "OR LOWER(a.descrizione) LIKE LOWER(CONCAT('%', :query, '%')) " +
                    "OR LOWER(a.categoria_principale) LIKE LOWER(CONCAT('%', :query, '%')) " +
                    "OR LOWER(a.categoria) LIKE LOWER(CONCAT('%', :query, '%')) " +
                    "OR LOWER(a.condizioni) LIKE LOWER(CONCAT('%', :query, '%'))",
            nativeQuery = true)
    List<Annuncio> searchAnnunci(@Param("query") String query);
}

