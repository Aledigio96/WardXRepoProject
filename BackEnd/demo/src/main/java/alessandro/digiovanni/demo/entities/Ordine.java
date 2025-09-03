package alessandro.digiovanni.demo.entities;


import alessandro.digiovanni.demo.enums.StatoOrdine;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "ordini")
public class Ordine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime dataOrdine = LocalDateTime.now();

    @Enumerated(EnumType.STRING)
    private StatoOrdine stato = StatoOrdine.IN_ATTESA;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToMany
    @JoinTable(
            name = "ordine_annunci",
            joinColumns = @JoinColumn(name = "ordine_id"),
            inverseJoinColumns = @JoinColumn(name = "annuncio_id")
    )
    private List<Annuncio> annunci = new ArrayList<>();

    public Ordine() {}

    public Ordine(User user, List<Annuncio> annunci) {
        this.user = user;
        this.annunci = annunci;
        this.dataOrdine = LocalDateTime.now();
        this.stato = StatoOrdine.IN_ATTESA;
    }

    public Long getId() {
        return id;
    }


    public LocalDateTime getDataOrdine() {
        return dataOrdine;
    }

    public void setDataOrdine(LocalDateTime dataOrdine) {
        this.dataOrdine = dataOrdine;
    }

    public StatoOrdine getStato() {
        return stato;
    }

    public void setStato(StatoOrdine stato) {
        this.stato = stato;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<Annuncio> getAnnunci() {
        return annunci;
    }

    public void setAnnunci(List<Annuncio> annunci) {
        this.annunci = annunci;
    }
}


