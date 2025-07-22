package aimbxt.expensetracker.user;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import aimbxt.expensetracker.expense.Expense;
import jakarta.persistence.*;


@Entity
@Table(name = "users")
public class User {
    @Id 
    @SequenceGenerator(
        name = "user_sequence", //name referenced below
        sequenceName = "user_sequence", //name of actual sequence object in database
        allocationSize = 1 //how many prefetched at once
    )
    @GeneratedValue(
        strategy = GenerationType.SEQUENCE,
        generator = "user_sequence"
    )
    private Long id;
    private String username;
    private String password;
    private Double balance;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Expense> expenses;

    public User() {
        balance = 0.0;
    }

    public User(long id, String username, String password) {
        this.id = id;
        this.username = username;
        this.password = password;
        balance = 0.0;
    }

    public User(String username, String password) {
        this.username = username;
        this.password = password;
        balance = 0.0;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Double getBalance() {
        return balance;
    }

    public void setBalance(Double balance) {
        this.balance = balance;
    }

    public List<Expense> getExpenses() {
        return expenses;
    }

    public void setExpenses(List<Expense> expenses) {
        this.expenses = expenses;
    }


}
