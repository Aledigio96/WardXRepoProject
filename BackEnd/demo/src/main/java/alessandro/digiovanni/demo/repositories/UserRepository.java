package alessandro.digiovanni.demo.repositories;

import alessandro.digiovanni.demo.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findById(Long id);
    Optional<User> findByEmail(String email);
    Page<User> findByUsernameContainingIgnoreCase(String username, Pageable pageable);
    Optional<User> findByUsername(String username);
}