package alessandro.digiovanni.demo.entities;


import jakarta.persistence.*;

import java.time.LocalDateTime;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "commenti")
public class Commento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String testo;

    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    @JsonIgnoreProperties({"commenti", "autore"}) // evita loop
    private PostSocial post;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties({
            "password", "email", "roles", "enabled",
            "commenti", "posts", "createdAt"
    }) // includi solo ciò che ti serve (username, avatarUrl)
    private User user;

    // Costruttore vuoto obbligatorio per JPA
    public Commento() {
    }

    // Costruttore utile per creare nuovi commenti
    public Commento(String testo, LocalDateTime createdAt, PostSocial post, User user) {
        this.testo = testo;
        this.createdAt = createdAt;
        this.post = post;
        this.user = user;
    }

    // Getters e setters
    public Long getId() {
        return id;
    }

    public String getTesto() {
        return testo;
    }

    public void setTesto(String testo) {
        this.testo = testo;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public PostSocial getPost() {
        return post;
    }

    public void setPost(PostSocial post) {
        this.post = post;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
