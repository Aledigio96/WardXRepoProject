package alessandro.digiovanni.demo.entities;


import alessandro.digiovanni.demo.enums.CategoriPrincipale;
import alessandro.digiovanni.demo.enums.Categoria;
import alessandro.digiovanni.demo.enums.Condizioni;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "annunci")
public class Annuncio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String titolo;
    private String descrizione;
    private Double prezzo;
    private String taglia;
    @Enumerated(EnumType.STRING)
    private Condizioni condizioni;
    private Boolean isAvailable = true;
    @Enumerated(EnumType.STRING)
    private CategoriPrincipale categoriaPrincipale;
    @Enumerated(EnumType.STRING)
    private Categoria categoria;
    @ElementCollection
    private List<String> imageUrls;
    @ManyToOne
    @JoinColumn(name = "seller_id")
    private User seller;

    public Annuncio() {
    }

    public Annuncio(String titolo, String descrizione, Double prezzo, String taglia, Condizioni condizioni, Boolean isAvailable, CategoriPrincipale categoriaPrincipale, Categoria categoria, List<String> imageUrls, User seller) {
        this.titolo = titolo;
        this.descrizione = descrizione;
        this.prezzo = prezzo;
        this.taglia = taglia;
        this.condizioni = condizioni;
        this.isAvailable = isAvailable;
        this.categoriaPrincipale = categoriaPrincipale;
        this.categoria = categoria;
        this.imageUrls = imageUrls;
        this.seller = seller;
    }


    public Long getId() {
        return id;
    }

    public String getTitolo() {
        return titolo;
    }

    public void setTitolo(String titolo) {
        this.titolo = titolo;
    }

    public String getDescrizione() {
        return descrizione;
    }

    public void setDescrizione(String descrizione) {
        this.descrizione = descrizione;
    }

    public Double getPrezzo() {
        return prezzo;
    }

    public void setPrezzo(Double prezzo) {
        this.prezzo = prezzo;
    }

    public String getTaglia() {
        return taglia;
    }

    public void setTaglia(String taglia) {
        this.taglia = taglia;
    }

    public Condizioni getCondizioni() {
        return condizioni;
    }

    public void setCondizioni(Condizioni condizioni) {
        this.condizioni = condizioni;
    }

    public Boolean getAvailable() {
        return isAvailable;
    }

    public void setAvailable(Boolean available) {
        isAvailable = available;
    }

    public CategoriPrincipale getCategoriaPrincipale() {
        return categoriaPrincipale;
    }

    public void setCategoriaPrincipale(CategoriPrincipale categoriaPrincipale) {
        this.categoriaPrincipale = categoriaPrincipale;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

    public List<String> getImageUrls() {
        return imageUrls;
    }

    public void setImageUrls(List<String> imageUrls) {
        this.imageUrls = imageUrls;
    }

    public User getSeller() {
        return seller;
    }

    public void setSeller(User seller) {
        this.seller = seller;
    }
}
