package alessandro.digiovanni.demo.repositories;

import alessandro.digiovanni.demo.entities.Commento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentoRepository extends JpaRepository<Commento,Long> {
    List<Commento> findByUserId(Long userId);
    List<Commento> findByPostId(Long postId);
}

