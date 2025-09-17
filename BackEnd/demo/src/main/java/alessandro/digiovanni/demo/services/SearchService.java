package alessandro.digiovanni.demo.services;

import alessandro.digiovanni.demo.entities.Annuncio;
import alessandro.digiovanni.demo.entities.User;
import alessandro.digiovanni.demo.payloads.AnnuncioDTO;
import alessandro.digiovanni.demo.payloads.UserDTO;
import alessandro.digiovanni.demo.repositories.AnnuncioRepository;
import alessandro.digiovanni.demo.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SearchService {

    private final AnnuncioRepository annuncioRepository;
    private final UserRepository userRepository;

    public SearchService(AnnuncioRepository annuncioRepository, UserRepository userRepository) {
        this.annuncioRepository = annuncioRepository;
        this.userRepository = userRepository;
    }

    public List<AnnuncioDTO> searchAnnunci(String query) {
        return annuncioRepository.searchAnnunci(query).stream()
                .map(this::mapToAnnuncioDTO)
                .collect(Collectors.toList());
    }

    public List<UserDTO> searchUsers(String query) {
        return userRepository.searchUsers(query).stream()
                .map(this::mapToUserDTO)
                .collect(Collectors.toList());
    }

    private AnnuncioDTO mapToAnnuncioDTO(Annuncio annuncio) {
        return new AnnuncioDTO(
                annuncio.getId(),
                annuncio.getTitolo(),
                annuncio.getDescrizione(),
                annuncio.getPrezzo(),
                annuncio.getTaglia(),
                annuncio.getCondizioni().name(),
                annuncio.getAvailable(),
                annuncio.getCategoriaPrincipale().name(),
                annuncio.getCategoria().name(),
                annuncio.getImage(),
                annuncio.getSeller().getId()
        );
    }

    private UserDTO mapToUserDTO(User user) {
        return new UserDTO(
                user.getId(),
                user.getUsername(),
                user.getName(),
                user.getSurname(),
                user.getAvatarUrl()
        );
    }
}
