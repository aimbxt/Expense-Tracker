package aimbxt.expensetracker.user;

import org.springframework.stereotype.Service;

@Service
public class BalanceService {
    
    private UserRepository userRepository;

    public BalanceService(UserRepository userRepository) {
        this.userRepository = userRepository; 
    }

    public void changeBalance(Long userId, Double balance) {
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalStateException("User not found"));
        user.setBalance(user.getBalance() + balance);
    }
}
