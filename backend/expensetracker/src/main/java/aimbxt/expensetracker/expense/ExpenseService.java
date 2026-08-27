package aimbxt.expensetracker.expense;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import aimbxt.expensetracker.user.User;
import aimbxt.expensetracker.user.UserRepository;
import aimbxt.expensetracker.user.BalanceService;

@Service
public class ExpenseService {
    
    private final ExpenseRepository expenseRepository;
    private final UserRepository userRepository;
    private final BalanceService balanceService;

    public ExpenseService(ExpenseRepository expenseRepository, UserRepository userRepository, BalanceService balanceService) {
        this.expenseRepository = expenseRepository;
        this.userRepository = userRepository;
        this.balanceService = balanceService;
    }

    public List<Expense> getExpenses() {
        return expenseRepository.findAll();
    }

    public List<Expense> getUserExpenses(Long userId) {
        if (!userRepository.existsById(userId)) {
            throw new IllegalStateException("User not found");
        }
        return expenseRepository.findByUserIdOrderByDateDesc(userId);
    }

    @Transactional
    public void addExpense(Long userId, Expense expense) {
        User user = userRepository.findById(userId).orElseThrow(() -> 
            new IllegalStateException("User not found"));
        user.getExpenses().add(expense);
        expense.setUser(user);
        expenseRepository.save(expense);

        balanceService.changeBalance(userId, expense.getAmount());
        userRepository.save(user);
    }

    @Transactional
    public void deleteExpense(Long userId, Long expenseId) {
        Expense expense = expenseRepository.findById(expenseId).orElseThrow(() -> 
            new IllegalStateException("Expense not found"));
        if (!expense.getUser().getId().equals(userId)) {
            throw new IllegalStateException("Expense does not belong to this user");
        }
        balanceService.changeBalance(userId, -expense.getAmount());
        expenseRepository.deleteById(expenseId);
        
    }

    @Transactional
    public void updateExpense(Long userId, Long expenseId, Expense newExpense) {
        Expense expense = expenseRepository.findById(expenseId).orElseThrow(() ->
            new IllegalStateException("Expense not found"));
        if (!expense.getUser().getId().equals(userId)) {
            throw new IllegalStateException("Expense does not belong to this user");
        }
        Double amountDifference = newExpense.getAmount() - expense.getAmount();
        expense.setName(newExpense.getName());
        expense.setAmount(newExpense.getAmount());
        expense.setDate(newExpense.getDate());
        expense.setCategory(newExpense.getCategory());

        expenseRepository.save(expense);
        balanceService.changeBalance(userId, amountDifference);
    }
}
