package alessandro.digiovanni.demo.controllers;

import alessandro.digiovanni.demo.payloads.PostSocialDTO;
import alessandro.digiovanni.demo.payloads.PostSocialRespDTO;
import alessandro.digiovanni.demo.services.PostSocialService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostSocialController {

    @Autowired
    private PostSocialService postService;


    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<PostSocialRespDTO> getAll() {
        return postService.getAll();
    }


    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public PostSocialRespDTO getById(@PathVariable Long id) {
        return postService.getById(id);
    }


    @GetMapping("/autore/{autoreId}")
    @PreAuthorize("hasRole('ADMIN') or principal.username == @userService.getUsernameById(#autoreId)")
    public List<PostSocialRespDTO> getByAutore(@PathVariable Long autoreId) {
        return postService.getByAutoreId(autoreId);
    }


    @PostMapping
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public PostSocialRespDTO create(@Valid @RequestBody PostSocialDTO dto,
                                    @AuthenticationPrincipal UserDetails userDetails) {

        return postService.create(dto);
    }


    @PutMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public PostSocialRespDTO update(@PathVariable Long id,
                                    @Valid @RequestBody PostSocialDTO dto,
                                    @AuthenticationPrincipal UserDetails userDetails) {
        return postService.update(id, dto);
    }


    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public void delete(@PathVariable Long id,
                       @AuthenticationPrincipal UserDetails userDetails) {
        postService.delete(id);
    }
}
