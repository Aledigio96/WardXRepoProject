package alessandro.digiovanni.demo.payloads;

import alessandro.digiovanni.demo.entities.Annuncio;
import alessandro.digiovanni.demo.entities.User;

public record AnnuncioSellerDTO(Long id,
                                String titolo,
                                String descrizione,
                                Double prezzo,
                                String taglia,
                                String condizioni,
                                Boolean isAvailable,
                                String categoriaPrincipale,
                                String categoria,
                                String image,
                                SellerDTO seller) {

    public static AnnuncioSellerDTO fromEntity(Annuncio a) {
        SellerDTO sellerDTO = null;
        User seller = a.getSeller();
        if (seller != null) {
            sellerDTO = new SellerDTO(seller.getId(), seller.getUsername());
        }

        return new AnnuncioSellerDTO(
                a.getId(),
                a.getTitolo(),
                a.getDescrizione(),
                a.getPrezzo(),
                a.getTaglia(),
                a.getCondizioni().name(),
                a.getAvailable(),
                a.getCategoriaPrincipale().name(),
                a.getCategoria().name(),
                a.getImage(),
                sellerDTO
        );
    }
}
