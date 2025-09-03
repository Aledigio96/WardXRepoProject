package alessandro.digiovanni.demo.services;

import alessandro.digiovanni.demo.entities.Annuncio;
import alessandro.digiovanni.demo.entities.Carrello;
import alessandro.digiovanni.demo.entities.Ordine;
import alessandro.digiovanni.demo.entities.User;
import alessandro.digiovanni.demo.enums.StatoOrdine;
import alessandro.digiovanni.demo.payloads.OrdineDTO;
import alessandro.digiovanni.demo.repositories.CarrelloRepository;
import alessandro.digiovanni.demo.repositories.OrdineRepository;
import alessandro.digiovanni.demo.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrdineService {

    @Autowired
    private CarrelloRepository carrelloRepository;

    @Autowired
    private OrdineRepository ordineRepository;

    @Autowired
    private UserRepository userRepository;

    public OrdineDTO creaOrdineDaCarrello(Long userId) {
        Carrello carrello = carrelloRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Carrello non trovato"));

        if (carrello.getAnnunci().isEmpty()) {
            throw new RuntimeException("Il carrello è vuoto.");
        }

        User user = carrello.getUser();

        Ordine ordine = new Ordine();
        ordine.setUser(user);
        ordine.setAnnunci(new ArrayList<>(carrello.getAnnunci()));
        ordine.setDataOrdine(LocalDateTime.now());
        ordine.setStato(StatoOrdine.IN_ATTESA);

        Ordine saved = ordineRepository.save(ordine);


        carrello.getAnnunci().clear();
        carrelloRepository.save(carrello);

        List<Long> annunciIds = saved.getAnnunci().stream().map(Annuncio::getId).toList();

        return new OrdineDTO(saved.getId(), saved.getDataOrdine(), saved.getStato(), user.getId(), annunciIds);
    }

    public List<OrdineDTO> getOrdiniUtente(Long userId) {
        List<Ordine> ordini = ordineRepository.findByUserId(userId);
        List<OrdineDTO> dtos = new ArrayList<>();

        for (Ordine o : ordini) {
            List<Long> annunciIds = o.getAnnunci().stream().map(Annuncio::getId).toList();
            dtos.add(new OrdineDTO(o.getId(), o.getDataOrdine(), o.getStato(), o.getUser().getId(), annunciIds));
        }

        return dtos;
    }
}