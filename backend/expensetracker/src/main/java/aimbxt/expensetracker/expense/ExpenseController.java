package aimbxt.expensetracker.expense;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/expense")
public class ExpenseController {
    
    private final ExpenseService expenseService;

    @Autowired
    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    @GetMapping
    public List<Expense> getExpenses() {
        return expenseService.getExpenses();
    }

    @PostMapping("/user/{userId}")
    public void addExpense(@PathVariable Long userId, @RequestBody Expense expense) {
        expenseService.addExpense(userId, expense);
    }

    @DeleteMapping("/user/{userId}/expense/{expenseId}")
    public void deleteExpense(@PathVariable Long userId, @PathVariable Long expenseId) {
        expenseService.deleteExpense(userId, expenseId);
    }

    @PutMapping("/user/{userId}/expense/{expenseId}")
    public void updateExpense(@PathVariable Long userId, @PathVariable Long expenseId, @RequestBody Expense expense) {
        expenseService.updateExpense(userId, expenseId, expense);
    }
}
