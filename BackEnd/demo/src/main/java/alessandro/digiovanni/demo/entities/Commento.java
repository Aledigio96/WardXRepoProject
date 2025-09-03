package alessandro.digiovanni.demo.entities;


import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "commenti")
public class Commento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 500)
    private String testo;

    private LocalDateTime createdAt = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "post_id")
    private PostSocial post;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Commento() {
    }

    public Commento(String testo, LocalDateTime createdAt, PostSocial post, User user) {
        this.testo = testo;
        this.createdAt = createdAt;
        this.post = post;
        this.user = user;
    }

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