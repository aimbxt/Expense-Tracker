package aimbxt.expensetracker.user;

import java.util.List;

import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private UserRepository userRepository;
    
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public void addNewUser(User user) {
        Optional<User> userOptional = userRepository.findByUsername(user.getUsername());
        if (userOptional.isPresent()) {
            throw new IllegalStateException("Username is already taken");
        }
        userRepository.save(user);
    }
 
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new IllegalStateException("User not found");
        }
        userRepository.deleteById(id);
    }

    public void updateUser(Long id, User user) {
        User existingUser = userRepository.findById(id).orElseThrow(() -> new IllegalStateException("User not found"));
        existingUser.setUsername(user.getUsername());
        existingUser.setPassword(user.getPassword());
        userRepository.save(existingUser);
    }   

    public void updateUsername(Long id, String username) {
        User existingUser = userRepository.findById(id).orElseThrow(() -> new IllegalStateException("User not found"));
        existingUser.setUsername(username);
        userRepository.save(existingUser);
    }

    public void updatePassword(Long id, String password) {
        User existingUser = userRepository.findById(id).orElseThrow(() -> new IllegalStateException("User not found"));
        existingUser.setPassword(password);
        userRepository.save(existingUser);
    }
}
