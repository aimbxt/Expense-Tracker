package aimbxt.expensetracker.expense;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import aimbxt.expensetracker.user.User;
import aimbxt.expensetracker.user.UserRepository;

@Service
public class ExpenseService {
    
    private final ExpenseRepository expenseRepository;
    private final UserRepository userRepository;

    public ExpenseService(ExpenseRepository expenseRepository, UserRepository userRepository) {
        this.expenseRepository = expenseRepository;
        this.userRepository = userRepository;
    }

    public List<Expense> getExpenses() {
        return expenseRepository.findAll();
    }

    public void addExpense(Long userId, Expense expense) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            throw new IllegalStateException("User not found");
        }
        User user = userOptional.get();
        user.getExpenses().add(expense);
        expense.setUser(user);
        expenseRepository.save(expense);
    }

    public void deleteExpense(Long userId, Long expenseId) {
        Expense expense = expenseRepository.findById(expenseId).orElseThrow(() -> 
            new IllegalStateException("Expense not found"));
        if (!expense.getUser().getId().equals(userId)) {
            throw new IllegalStateException("Expense does not belong to this user");
        }
        expenseRepository.deleteById(expenseId);
    }

    public void updateExpense(Long userId, Long expenseId, Expense newExpense) {
        Expense expense = expenseRepository.findById(expenseId).orElseThrow(() ->
            new IllegalStateException("Expense not found"));
        if (!expense.getUser().getId().equals(userId)) {
            throw new IllegalStateException("Expense does not belong to this user");
        }
        expense.setName(newExpense.getName());
        expense.setAmount(newExpense.getAmount());
        expense.setDate(newExpense.getDate());
        expense.setCategory(newExpense.getCategory());

        expenseRepository.save(expense);
    }
}
