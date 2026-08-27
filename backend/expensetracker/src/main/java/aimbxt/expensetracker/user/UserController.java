package aimbxt.expensetracker.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/user")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
    
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> getUsers() {
        return userService.getUsers();
    }

    @PostMapping
    public void addUser(@RequestBody User user) {
        userService.addNewUser(user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }
    
    @PutMapping("/{id}")
    public void updateUser(@PathVariable Long id, @RequestBody User newUser) {
        userService.updateUser(id, newUser);
    } 

    @PutMapping("{id}/user/username")
    public void updateUsername(@PathVariable Long id, @RequestBody User newUser) {
        userService.updateUsername(id, newUser.getUsername());
    } 

    @PutMapping("/{id}/user/password")
    public void updatePassword(@PathVariable Long id, @RequestBody User newUser) {
        userService.updatePassword(id, newUser.getPassword());
    } 
}
