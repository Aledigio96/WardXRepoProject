package alessandro.digiovanni.demo.services;

import alessandro.digiovanni.demo.entities.PostSocial;
import alessandro.digiovanni.demo.entities.User;
import alessandro.digiovanni.demo.payloads.PostSocialDTO;
import alessandro.digiovanni.demo.payloads.PostSocialRespDTO;
import alessandro.digiovanni.demo.repositories.PostSocialRepository;
import alessandro.digiovanni.demo.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class PostSocialService {

    @Autowired
    private PostSocialRepository postRepo;

    @Autowired
    private UserRepository userRepo;

    public List<PostSocialRespDTO> getAll() {
        List<PostSocial> posts = postRepo.findAll();
        List<PostSocialRespDTO> resp = new ArrayList<>();

        for (PostSocial p : posts) {
            resp.add(toDTO(p));
        }
        return resp;
    }

    public PostSocialRespDTO getById(Long id) {
        PostSocial post = postRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Post non trovato con id: " + id));
        return toDTO(post);
    }

    public PostSocialRespDTO create(PostSocialDTO dto) {
        PostSocial post = new PostSocial();
        post.setContent(dto.content());
        post.setCreatedAt(LocalDateTime.now());
        post.setImageUrls(dto.imageUrls());

        User autore = userRepo.findById(dto.autoreId())
                .orElseThrow(() -> new RuntimeException("Autore non trovato con id: " + dto.autoreId()));
        post.setAutore(autore);

        return toDTO(postRepo.save(post));
    }

    public PostSocialRespDTO update(Long id, PostSocialDTO dto) {
        PostSocial post = postRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Post non trovato con id: " + id));

        post.setContent(dto.content());
        post.setImageUrls(dto.imageUrls());

        if (dto.autoreId() != null) {
            User autore = userRepo.findById(dto.autoreId())
                    .orElseThrow(() -> new RuntimeException("Autore non trovato"));
            post.setAutore(autore);
        }

        return toDTO(postRepo.save(post));
    }

    public void delete(Long id) {
        if (!postRepo.existsById(id)) {
            throw new RuntimeException("Post non trovato");
        }
        postRepo.deleteById(id);
    }

    public List<PostSocialRespDTO> getByAutoreId(Long autoreId) {
        List<PostSocial> posts = postRepo.findByAutoreId(autoreId);
        List<PostSocialRespDTO> resp = new ArrayList<>();

        for (PostSocial p : posts) {
            resp.add(toDTO(p));
        }
        return resp;
    }

    private PostSocialRespDTO toDTO(PostSocial post) {
        return new PostSocialRespDTO(
                post.getId(),
                post.getContent(),
                post.getCreatedAt(),
                post.getImageUrls(),
                post.getAutore().getId()
        );
    }
}