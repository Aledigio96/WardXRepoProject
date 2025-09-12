package alessandro.digiovanni.demo.services;

import alessandro.digiovanni.demo.entities.Commento;
import alessandro.digiovanni.demo.entities.PostSocial;
import alessandro.digiovanni.demo.entities.User;
import alessandro.digiovanni.demo.payloads.CommentoDTO;
import alessandro.digiovanni.demo.payloads.CommentoRespDTO;
import alessandro.digiovanni.demo.repositories.CommentoRepository;
import alessandro.digiovanni.demo.repositories.PostSocialRepository;
import alessandro.digiovanni.demo.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class CommentoService {

    @Autowired
    private CommentoRepository commentoRepository;

    @Autowired
    private PostSocialRepository postSocialRepository;

    @Autowired
    private UserRepository userRepository;

    public List<CommentoRespDTO> getAllCommenti() {
        List<Commento> commenti = commentoRepository.findAll();
        List<CommentoRespDTO> responseList = new ArrayList<>();

        for (Commento commento : commenti) {
            User autore = commento.getUser();
            CommentoRespDTO dto = new CommentoRespDTO(
                    commento.getId(),
                    commento.getTesto(),
                    commento.getCreatedAt(),
                    commento.getPost().getId(),
                    autore.getId(),
                    autore.getUsername(),
                    autore.getAvatarUrl()
            );
            responseList.add(dto);
        }

        return responseList;
    }

    public CommentoRespDTO getCommentoById(Long id) {
        Commento commento = commentoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Commento non trovato con id: " + id));

        User autore = commento.getUser();
        return new CommentoRespDTO(
                commento.getId(),
                commento.getTesto(),
                commento.getCreatedAt(),
                commento.getPost().getId(),
                autore.getId(),
                autore.getUsername(),
                autore.getAvatarUrl()
        );
    }

    public CommentoRespDTO createCommento(CommentoDTO dto) {
        Commento commento = new Commento();
        commento.setTesto(dto.testo());
        commento.setCreatedAt(LocalDateTime.now());

        PostSocial post = postSocialRepository.findById(dto.postId())
                .orElseThrow(() -> new RuntimeException("Post non trovato con id: " + dto.postId()));
        commento.setPost(post);

        User user = userRepository.findById(dto.userId())
                .orElseThrow(() -> new RuntimeException("User non trovato con id: " + dto.userId()));
        commento.setUser(user);

        Commento saved = commentoRepository.save(commento);

        return new CommentoRespDTO(
                saved.getId(),
                saved.getTesto(),
                saved.getCreatedAt(),
                saved.getPost().getId(),
                user.getId(),
                user.getUsername(),
                user.getAvatarUrl()
        );
    }

    public CommentoRespDTO updateCommento(Long id, CommentoDTO dto) {
        Commento commento = commentoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Commento non trovato con id: " + id));

        commento.setTesto(dto.testo());

        if (dto.postId() != null) {
            PostSocial post = postSocialRepository.findById(dto.postId())
                    .orElseThrow(() -> new RuntimeException("Post non trovato con id: " + dto.postId()));
            commento.setPost(post);
        }

        User user = commento.getUser(); // Default: utente corrente

        if (dto.userId() != null) {
            user = userRepository.findById(dto.userId())
                    .orElseThrow(() -> new RuntimeException("User non trovato con id: " + dto.userId()));
            commento.setUser(user);
        }

        Commento updated = commentoRepository.save(commento);

        return new CommentoRespDTO(
                updated.getId(),
                updated.getTesto(),
                updated.getCreatedAt(),
                updated.getPost().getId(),
                user.getId(),
                user.getUsername(),
                user.getAvatarUrl()
        );
    }

    public void deleteCommento(Long id) {
        if (!commentoRepository.existsById(id)) {
            throw new RuntimeException("Commento non trovato con id: " + id);
        }
        commentoRepository.deleteById(id);
    }

    public List<CommentoRespDTO> getCommentiByUserId(Long userId) {
        List<Commento> commenti = commentoRepository.findByUserId(userId);
        List<CommentoRespDTO> responseList = new ArrayList<>();

        for (Commento commento : commenti) {
            User autore = commento.getUser();
            CommentoRespDTO dto = new CommentoRespDTO(
                    commento.getId(),
                    commento.getTesto(),
                    commento.getCreatedAt(),
                    commento.getPost().getId(),
                    autore.getId(),
                    autore.getUsername(),
                    autore.getAvatarUrl()
            );
            responseList.add(dto);
        }

        return responseList;
    }

    public List<CommentoRespDTO> getCommentiByPostId(Long postId) {
        List<Commento> commenti = commentoRepository.findByPostId(postId);
        List<CommentoRespDTO> responseList = new ArrayList<>();

        for (Commento commento : commenti) {
            User autore = commento.getUser();
            CommentoRespDTO dto = new CommentoRespDTO(
                    commento.getId(),
                    commento.getTesto(),
                    commento.getCreatedAt(),
                    commento.getPost().getId(),
                    autore.getId(),
                    autore.getUsername(),
                    autore.getAvatarUrl()
            );
            responseList.add(dto);
        }

        return responseList;
    }
}
