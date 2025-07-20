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
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isEmpty()) {
            throw new IllegalStateException("User does not exist");
        }
        userRepository.deleteById(id);
    }

    public void updateUser(Long id, User user) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isEmpty()) {
            throw new IllegalStateException("User does not exist");
        }
        User existingUser = userOptional.get();
        existingUser.setUsername(user.getUsername());
        existingUser.setPassword(user.getPassword());
        userRepository.save(existingUser);
    }

    public void updateUsername(Long id, String username) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isEmpty()) {
            throw new IllegalStateException("User does not exist");
        }
        User existingUser = userOptional.get();
        existingUser.setUsername(username);
        userRepository.save(existingUser);
    }

    public void updatePassword(Long id, String password) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isEmpty()) {
            throw new IllegalStateException("User does not exist");
        }
        User existingUser = userOptional.get();
        existingUser.setPassword(password);
        userRepository.save(existingUser);
    }
}
