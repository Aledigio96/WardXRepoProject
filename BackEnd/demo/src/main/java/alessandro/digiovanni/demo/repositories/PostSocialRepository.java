package alessandro.digiovanni.demo.repositories;

import alessandro.digiovanni.demo.entities.PostSocial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostSocialRepository extends JpaRepository<PostSocial,Long> {
    List<PostSocial> findByAutoreId(Long autoreId);
}