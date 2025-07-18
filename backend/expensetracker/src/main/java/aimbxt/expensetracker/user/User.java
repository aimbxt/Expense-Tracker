package aimbxt.expensetracker.user;

import java.util.List;

import aimbxt.expensetracker.expense.Expense;
import jakarta.persistence.*;


@Entity
@Table
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
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Expense> expenses;

    public User() {}

    public User(long id, String username, String password) {
        this.id = id;
        this.username = username;
        this.password = password;
    }

    public User(String username, String password) {
        this.username = username;
        this.password = password;
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


}
