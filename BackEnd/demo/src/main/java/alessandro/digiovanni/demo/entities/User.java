package alessandro.digiovanni.demo.entities;


import alessandro.digiovanni.demo.enums.Role;
import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "users")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String surname;
    private String username;
    private String email;
    private String password;
    private String bio;
    private String avatarUrl;
    @Enumerated(EnumType.STRING)
    private Role role;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "provincia_id")
    private Provincia provincia;

    private LocalDateTime createdAt = LocalDateTime.now();

    @OneToMany(mappedBy = "seller", cascade = CascadeType.ALL)
    private List<Annuncio> annunci;

    @OneToMany(mappedBy = "autore", cascade = CascadeType.ALL)
    private List<PostSocial> posts;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Commento> commenti;
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Carrello carrello;


    public User() {
    }

    public User(String name, String surname,String username, String email, String password, String bio, String avatarUrl,Role role,Provincia provincia, LocalDateTime createdAt, List<Annuncio> annunci, List<PostSocial> posts, List<Commento> commenti,Carrello carrello) {
        this.name = name;
        this.surname = surname;
        this.username = username;
        this.email = email;
        this.password = password;
        this.bio = bio;
        this.avatarUrl = avatarUrl;
        this.role=role;
        this.provincia=provincia;
        this.createdAt = createdAt;
        this.annunci = annunci;
        this.posts = posts;
        this.commenti = commenti;
        this.carrello= carrello;
    }


    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }
    public Provincia getProvincia() {
        return provincia;
    }

    public void setProvincia(Provincia provincia) {
        this.provincia = provincia;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public List<Annuncio> getAnnunci() {
        return annunci;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public void setAnnunci(List<Annuncio> annunci) {
        this.annunci = annunci;
    }

    public List<PostSocial> getPosts() {
        return posts;
    }

    public void setPosts(List<PostSocial> posts) {
        this.posts = posts;
    }

    public List<Commento> getCommenti() {
        return commenti;
    }

    public void setCommenti(List<Commento> commenti) {
        this.commenti = commenti;
    }

    public Carrello getCarrello() {
        return carrello;
    }

    public void setCarrello(Carrello carrello) {
        this.carrello = carrello;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + this.role.name()));
    }
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
