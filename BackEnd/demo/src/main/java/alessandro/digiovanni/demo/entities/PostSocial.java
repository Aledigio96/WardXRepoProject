package alessandro.digiovanni.demo.entities;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "posts")
public class PostSocial {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 1000)
    private String content;

    private LocalDateTime createdAt = LocalDateTime.now();

    @ElementCollection
    private List<String> imageUrls;

    @ManyToOne
    @JoinColumn(name = "autore_id")
    private User autore;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    private List<Commento> commenti;

    public PostSocial() {
    }

    public PostSocial(String content, LocalDateTime createdAt, List<String> imageUrls, User autore, List<Commento> commenti) {
        this.content = content;
        this.createdAt = createdAt;
        this.imageUrls = imageUrls;
        this.autore = autore;
        this.commenti = commenti;
    }

    public Long getId() {
        return id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public List<String> getImageUrls() {
        return imageUrls;
    }

    public void setImageUrls(List<String> imageUrls) {
        this.imageUrls = imageUrls;
    }

    public User getAutore() {
        return autore;
    }

    public void setAutore(User autore) {
        this.autore = autore;
    }

    public List<Commento> getCommenti() {
        return commenti;
    }

    public void setCommenti(List<Commento> commenti) {
        this.commenti = commenti;
    }
}