package alessandro.digiovanni.demo.services;

import alessandro.digiovanni.demo.entities.Annuncio;
import alessandro.digiovanni.demo.entities.Carrello;
import alessandro.digiovanni.demo.entities.User;
import alessandro.digiovanni.demo.payloads.CarrelloDTO;
import alessandro.digiovanni.demo.repositories.AnnuncioRepository;
import alessandro.digiovanni.demo.repositories.CarrelloRepository;
import alessandro.digiovanni.demo.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarrelloService {

    @Autowired
    private CarrelloRepository carrelloRepository;

    @Autowired
    private AnnuncioRepository annuncioRepository;

    @Autowired
    private UserRepository userRepository;

    public CarrelloDTO getCarrelloByUserId(Long userId) {
        Carrello carrello = carrelloRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Carrello non trovato"));
        List<Long> annunciIds = carrello.getAnnunci().stream().map(Annuncio::getId).toList();
        return new CarrelloDTO(carrello.getId(), carrello.getUser().getId(), annunciIds);
    }

    public CarrelloDTO addAnnuncioToCarrello(Long userId, Long annuncioId) {
        Carrello carrello = carrelloRepository.findByUserId(userId)
                .orElseGet(() -> createCarrelloForUser(userId));

        Annuncio annuncio = annuncioRepository.findById(annuncioId)
                .orElseThrow(() -> new RuntimeException("Annuncio non trovato"));

        if (!carrello.getAnnunci().contains(annuncio)) {
            carrello.getAnnunci().add(annuncio);
            carrelloRepository.save(carrello);
        }
        return getCarrelloByUserId(userId);
    }

    public CarrelloDTO removeAnnuncioFromCarrello(Long userId, Long annuncioId) {
        Carrello carrello = carrelloRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Carrello non trovato"));

        carrello.getAnnunci().removeIf(a -> a.getId().equals(annuncioId));
        carrelloRepository.save(carrello);
        return getCarrelloByUserId(userId);
    }

    public void svuotaCarrello(Long userId) {
        Carrello carrello = carrelloRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Carrello non trovato"));
        carrello.getAnnunci().clear();
        carrelloRepository.save(carrello);
    }



    private Carrello createCarrelloForUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User non trovato"));

        Carrello carrello = new Carrello();
        carrello.setUser(user);
        return carrelloRepository.save(carrello);
    }
}