package alessandro.digiovanni.demo.controllers;

import alessandro.digiovanni.demo.entities.User;
import alessandro.digiovanni.demo.payloads.AnnuncioCreateDTO;
import alessandro.digiovanni.demo.payloads.AnnuncioDTO;
import alessandro.digiovanni.demo.payloads.AnnuncioUpdateDTO;
import alessandro.digiovanni.demo.services.AnnuncioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/annunci")

public class AnnuncioController {

    @Autowired
    private AnnuncioService annuncioService;

    @GetMapping
    public List<AnnuncioDTO> getAll() {
        return annuncioService.findAll();
    }


    @GetMapping("/{id}")
    public AnnuncioDTO getById(@PathVariable Long id) {
        return annuncioService.findById(id);
    }


    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @PostMapping
    public AnnuncioDTO create(@Valid @RequestBody AnnuncioCreateDTO dto,
                              @AuthenticationPrincipal UserDetails userDetails) {
        return annuncioService.create(dto, userDetails.getUsername());
    }


    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @PatchMapping("/{id}")
    public AnnuncioDTO updateParziale(@PathVariable Long id,
                                      @RequestBody AnnuncioUpdateDTO dto,
                                      @AuthenticationPrincipal UserDetails userDetails) {
        return annuncioService.update(id, dto, userDetails.getUsername());
    }


    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id,
                       @AuthenticationPrincipal UserDetails userDetails) {
        annuncioService.delete(id, userDetails.getUsername());
    }
    @PostMapping("/{id}/images")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public List<String> uploadAnnuncioImages(
            @PathVariable Long id,
            @AuthenticationPrincipal User user,
            @RequestParam("files") List<MultipartFile> files) {
        return annuncioService.uploadAnnuncioImages(id, user, files);
    }

    @DeleteMapping("/{id}/images")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public List<String> removeAnnuncioImage(
            @PathVariable Long id,
            @AuthenticationPrincipal User user,
            @RequestParam("url") String imageUrl) {
        return annuncioService.removeAnnuncioImage(id, user, imageUrl);
    }
}
