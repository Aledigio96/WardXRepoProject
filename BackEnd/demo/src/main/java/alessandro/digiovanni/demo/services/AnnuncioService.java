package alessandro.digiovanni.demo.services;

import alessandro.digiovanni.demo.entities.Annuncio;
import alessandro.digiovanni.demo.entities.User;
import alessandro.digiovanni.demo.enums.CategoriPrincipale;
import alessandro.digiovanni.demo.enums.Categoria;
import alessandro.digiovanni.demo.enums.Condizioni;
import alessandro.digiovanni.demo.exceptions.UnauthorizedAnnuncioAccessException;
import alessandro.digiovanni.demo.payloads.AnnuncioCreateDTO;
import alessandro.digiovanni.demo.payloads.AnnuncioDTO;
import alessandro.digiovanni.demo.payloads.AnnuncioUpdateDTO;
import alessandro.digiovanni.demo.repositories.AnnuncioRepository;
import alessandro.digiovanni.demo.repositories.UserRepository;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class AnnuncioService {

    @Autowired
    private AnnuncioRepository annuncioRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private Cloudinary cloudinary;

    public List<AnnuncioDTO> findAll() {
        List<Annuncio> annunci = annuncioRepository.findAll();
        List<AnnuncioDTO> result = new ArrayList<>();

        for (Annuncio annuncio : annunci) {
            AnnuncioDTO dto = new AnnuncioDTO(
                    annuncio.getId(),
                    annuncio.getTitolo(),
                    annuncio.getDescrizione(),
                    annuncio.getPrezzo(),
                    annuncio.getTaglia(),
                    annuncio.getCondizioni() != null ? annuncio.getCondizioni().name() : null,
                    annuncio.getAvailable(),
                    annuncio.getCategoriaPrincipale() != null ? annuncio.getCategoriaPrincipale().name() : null,
                    annuncio.getCategoria() != null ? annuncio.getCategoria().name() : null,
                    annuncio.getImageUrls(),
                    annuncio.getSeller() != null ? annuncio.getSeller().getId() : null
            );
            result.add(dto);
        }
        return result;
    }

    public AnnuncioDTO findById(Long id) {
        Annuncio annuncio = annuncioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Annuncio non trovato con id " + id));

        return new AnnuncioDTO(
                annuncio.getId(),
                annuncio.getTitolo(),
                annuncio.getDescrizione(),
                annuncio.getPrezzo(),
                annuncio.getTaglia(),
                annuncio.getCondizioni() != null ? annuncio.getCondizioni().name() : null,
                annuncio.getAvailable(),
                annuncio.getCategoriaPrincipale() != null ? annuncio.getCategoriaPrincipale().name() : null,
                annuncio.getCategoria() != null ? annuncio.getCategoria().name() : null,
                annuncio.getImageUrls(),
                annuncio.getSeller() != null ? annuncio.getSeller().getId() : null
        );
    }

    public AnnuncioDTO create(AnnuncioCreateDTO dto, String username) {
        User seller = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Utente non trovato: " + username));

        Annuncio annuncio = new Annuncio();
        annuncio.setTitolo(dto.titolo());
        annuncio.setDescrizione(dto.descrizione());
        annuncio.setPrezzo(dto.prezzo());
        annuncio.setTaglia(dto.taglia());
        annuncio.setCondizioni(dto.condizioni() != null ? Condizioni.valueOf(dto.condizioni()) : null);
        annuncio.setAvailable(dto.isAvailable() != null ? dto.isAvailable() : true);
        annuncio.setCategoriaPrincipale(dto.categoriaPrincipale() != null ? CategoriPrincipale.valueOf(dto.categoriaPrincipale()) : null);
        annuncio.setCategoria(dto.categoria() != null ? Categoria.valueOf(dto.categoria()) : null);
        annuncio.setImageUrls(dto.imageUrls());
        annuncio.setSeller(seller);

        Annuncio saved = annuncioRepository.save(annuncio);

        return new AnnuncioDTO(
                saved.getId(),
                saved.getTitolo(),
                saved.getDescrizione(),
                saved.getPrezzo(),
                saved.getTaglia(),
                saved.getCondizioni() != null ? saved.getCondizioni().name() : null,
                saved.getAvailable(),
                saved.getCategoriaPrincipale() != null ? saved.getCategoriaPrincipale().name() : null,
                saved.getCategoria() != null ? saved.getCategoria().name() : null,
                saved.getImageUrls(),
                saved.getSeller() != null ? saved.getSeller().getId() : null
        );
    }

    public AnnuncioDTO update(Long id, AnnuncioUpdateDTO dto, String username) {
        Annuncio annuncio = annuncioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Annuncio non trovato con id " + id));

        if (annuncio.getSeller() == null || !annuncio.getSeller().getUsername().equals(username)) {
            throw new UnauthorizedAnnuncioAccessException("Non sei il proprietario di questo annuncio");
        }

        if (dto.titolo() != null) annuncio.setTitolo(dto.titolo());
        if (dto.descrizione() != null) annuncio.setDescrizione(dto.descrizione());
        if (dto.prezzo() != null) annuncio.setPrezzo(dto.prezzo());
        if (dto.taglia() != null) annuncio.setTaglia(dto.taglia());
        if (dto.condizioni() != null) annuncio.setCondizioni(Condizioni.valueOf(dto.condizioni()));
        if (dto.isAvailable() != null) annuncio.setAvailable(dto.isAvailable());
        if (dto.categoriaPrincipale() != null) annuncio.setCategoriaPrincipale(CategoriPrincipale.valueOf(dto.categoriaPrincipale()));
        if (dto.categoria() != null) annuncio.setCategoria(Categoria.valueOf(dto.categoria()));
        if (dto.imageUrls() != null) annuncio.setImageUrls(dto.imageUrls());

        Annuncio updated = annuncioRepository.save(annuncio);

        return new AnnuncioDTO(
                updated.getId(),
                updated.getTitolo(),
                updated.getDescrizione(),
                updated.getPrezzo(),
                updated.getTaglia(),
                updated.getCondizioni() != null ? updated.getCondizioni().name() : null,
                updated.getAvailable(),
                updated.getCategoriaPrincipale() != null ? updated.getCategoriaPrincipale().name() : null,
                updated.getCategoria() != null ? updated.getCategoria().name() : null,
                updated.getImageUrls(),
                updated.getSeller() != null ? updated.getSeller().getId() : null
        );
    }

    public void delete(Long id, String username) {
        Annuncio annuncio = annuncioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Annuncio non trovato con id " + id));

        if (annuncio.getSeller() == null || !annuncio.getSeller().getUsername().equals(username)) {
            throw new UnauthorizedAnnuncioAccessException("Non sei il proprietario di questo annuncio");
        }

        annuncioRepository.deleteById(id);
    }

    public List<String> uploadAnnuncioImages(Long annuncioId, User user, List<MultipartFile> files) {
        Annuncio annuncio = annuncioRepository.findById(annuncioId)
                .orElseThrow(() -> new RuntimeException("Annuncio non trovato"));

        if (!annuncio.getSeller().getId().equals(user.getId())) {
            throw new UnauthorizedAnnuncioAccessException("Non sei il proprietario di questo annuncio");
        }

        List<String> newImageUrls = new ArrayList<>();

        for (MultipartFile file : files) {
            try {
                Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
                String imageUrl = uploadResult.get("secure_url").toString();
                newImageUrls.add(imageUrl);
            } catch (IOException e) {
                throw new RuntimeException("Errore durante l'upload dell'immagine", e);
            }
        }

        List<String> updatedImageUrls = new ArrayList<>(annuncio.getImageUrls());
        updatedImageUrls.addAll(newImageUrls);

        annuncio.setImageUrls(updatedImageUrls);
        annuncioRepository.save(annuncio);

        return newImageUrls;
    }

    public List<String> removeAnnuncioImage(Long annuncioId, User user, String imageUrlToRemove) {
        Annuncio annuncio = annuncioRepository.findById(annuncioId)
                .orElseThrow(() -> new RuntimeException("Annuncio non trovato"));

        if (!annuncio.getSeller().getId().equals(user.getId())) {
            throw new UnauthorizedAnnuncioAccessException("Non sei il proprietario di questo annuncio");
        }

        List<String> updatedImages = new ArrayList<>(annuncio.getImageUrls());

        boolean removed = updatedImages.remove(imageUrlToRemove);
        if (!removed) {
            throw new RuntimeException("L'immagine da rimuovere non è presente nell'annuncio");
        }

        annuncio.setImageUrls(updatedImages);
        annuncioRepository.save(annuncio);

        return updatedImages;
    }
}
