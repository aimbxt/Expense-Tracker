package aimbxt.expensetracker.user;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
    @Query("SELECT s FROM Student s WHERE s.username=?1")
    Optional<User> findByUsername(String username);
}
