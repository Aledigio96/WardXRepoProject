package alessandro.digiovanni.demo.controllers;

import alessandro.digiovanni.demo.payloads.CommentoDTO;
import alessandro.digiovanni.demo.payloads.CommentoRespDTO;
import alessandro.digiovanni.demo.services.CommentoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/commenti")
public class CommentoController {

    @Autowired
    private CommentoService commentoService;


    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<CommentoRespDTO> getAll() {
        return commentoService.getAllCommenti();
    }


    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    public CommentoRespDTO getById(@PathVariable Long id) {
        return commentoService.getCommentoById(id);
    }


    @GetMapping("/post/{postId}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    public List<CommentoRespDTO> getByPost(@PathVariable Long postId) {
        return commentoService.getCommentiByPostId(postId);
    }


    @GetMapping("/user/{userId}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    public List<CommentoRespDTO> getByUser(@PathVariable Long userId) {
        return commentoService.getCommentiByUserId(userId);
    }


    @PostMapping
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public CommentoRespDTO create(@Valid @RequestBody CommentoDTO dto) {
        return commentoService.createCommento(dto);
    }


    @PutMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public CommentoRespDTO update(@PathVariable Long id, @Valid @RequestBody CommentoDTO dto) {
        return commentoService.updateCommento(id, dto);
    }


    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public void delete(@PathVariable Long id) {
        commentoService.deleteCommento(id);
    }
}
