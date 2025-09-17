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
    private Cloudinary cloudinary;

    @Autowired
    private AnnuncioRepository annuncioRepository;

    @Autowired
    private UserRepository userRepository;

    public List<AnnuncioDTO> findAll() {
        return annuncioRepository.findAll()
                .stream()
                .map(this::toDTO)
                .toList();
    }

    public AnnuncioDTO findById(Long id) {
        Annuncio annuncio = annuncioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Annuncio non trovato con id " + id));
        return toDTO(annuncio);
    }

    public AnnuncioDTO create(AnnuncioCreateDTO dto, String username, MultipartFile file) {
        User seller = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Utente non trovato: " + username));


        String imageUrl;
        try {
            Map<?, ?> uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
            imageUrl = uploadResult.get("secure_url").toString();
        } catch (IOException e) {
            throw new RuntimeException("Errore nel caricamento dell'immagine su Cloudinary", e);
        }

        Annuncio annuncio = new Annuncio();
        annuncio.setTitolo(dto.titolo());
        annuncio.setDescrizione(dto.descrizione());
        annuncio.setPrezzo(dto.prezzo());
        annuncio.setTaglia(dto.taglia());
        annuncio.setCondizioni(Condizioni.valueOf(dto.condizioni()));
        annuncio.setAvailable(dto.isAvailable());
        annuncio.setCategoriaPrincipale(CategoriPrincipale.valueOf(dto.categoriaPrincipale()));
        annuncio.setCategoria(Categoria.valueOf(dto.categoria()));
        annuncio.setImage(imageUrl);
        annuncio.setSeller(seller);

        Annuncio saved = annuncioRepository.save(annuncio);
        return toDTO(saved);
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


        MultipartFile newImage = dto.image();
        if (newImage != null && !newImage.isEmpty()) {
            try {
                Map<?, ?> uploadResult = cloudinary.uploader().upload(newImage.getBytes(), ObjectUtils.emptyMap());
                String imageUrl = uploadResult.get("secure_url").toString();
                annuncio.setImage(imageUrl);
            } catch (IOException e) {
                throw new RuntimeException("Errore nel caricamento della nuova immagine", e);
            }
        }

        Annuncio updated = annuncioRepository.save(annuncio);
        return toDTO(updated);
    }

    public void delete(Long id, String username) {
        Annuncio annuncio = annuncioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Annuncio non trovato con id " + id));

        if (annuncio.getSeller() == null || !annuncio.getSeller().getUsername().equals(username)) {
            throw new UnauthorizedAnnuncioAccessException("Non sei il proprietario di questo annuncio");
        }

        annuncioRepository.deleteById(id);
    }

    public AnnuncioDTO uploadNewImage(Long annuncioId, User user, MultipartFile file) {
        Annuncio annuncio = annuncioRepository.findById(annuncioId)
                .orElseThrow(() -> new RuntimeException("Annuncio non trovato"));

        if (!annuncio.getSeller().getId().equals(user.getId())) {
            throw new UnauthorizedAnnuncioAccessException("Non sei il proprietario di questo annuncio");
        }

        try {
            Map<?, ?> uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
            String newImageUrl = uploadResult.get("secure_url").toString();
            annuncio.setImage(newImageUrl);
            annuncioRepository.save(annuncio);
            return toDTO(annuncio);
        } catch (IOException e) {
            throw new RuntimeException("Errore durante l'upload della nuova immagine", e);
        }
    }

    public List<AnnuncioDTO> findByUsername(String username) {
        return annuncioRepository.findBySellerUsername(username)
                .stream()
                .map(this::toDTO)
                .toList();
    }
    private AnnuncioDTO toDTO(Annuncio annuncio) {
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
                annuncio.getImage(),
                annuncio.getSeller() != null ? annuncio.getSeller().getId() : null
        );
    }
}
