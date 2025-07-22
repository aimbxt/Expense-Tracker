package aimbxt.expensetracker.expense;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonBackReference;

import aimbxt.expensetracker.user.User;
import jakarta.persistence.*;

@Entity
public class Expense {
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

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference
    private User user;

    private String name;
    private Double amount;
    private LocalDate date;
    private String category;

    public Expense() {}

    public Expense(User user) {
        this.user = user;
    }

    public Expense(User user, String name, Double amount, LocalDate date, String category) {
        this.user = user;
        this.name = name;
        this.amount = amount;
        this.date = date;
        this.category = category;
    }

    public Expense(String name, Double amount, LocalDate date, String category) {
        this.name = name;
        this.amount = amount;
        this.date = date;
        this.category = category;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    } 

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}
