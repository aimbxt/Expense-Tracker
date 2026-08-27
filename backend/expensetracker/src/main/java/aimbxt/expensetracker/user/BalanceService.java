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
        double currentBalance = user.getBalance() == null ? 0.0 : user.getBalance();
        user.setBalance(currentBalance + balance);
        userRepository.save(user);
    }
}
