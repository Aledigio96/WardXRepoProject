package alessandro.digiovanni.demo.controllers;

import alessandro.digiovanni.demo.entities.User;
import alessandro.digiovanni.demo.payloads.AnnuncioCreateDTO;
import alessandro.digiovanni.demo.payloads.AnnuncioDTO;
import alessandro.digiovanni.demo.payloads.AnnuncioSellerDTO;
import alessandro.digiovanni.demo.payloads.AnnuncioUpdateDTO;
import alessandro.digiovanni.demo.services.AnnuncioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
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
    public List<AnnuncioSellerDTO> getAllAnnunci() {
        return annuncioService.findAll();
    }

    @GetMapping("/{id}")
    public AnnuncioDTO getById(@PathVariable Long id) {
        return annuncioService.findById(id);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public AnnuncioDTO create(
            @RequestPart("dto") @Valid AnnuncioCreateDTO dto,
            @RequestPart("image") MultipartFile image,
            @AuthenticationPrincipal UserDetails userDetails) {
        return annuncioService.create(dto, userDetails.getUsername(), image);
    }

    @PatchMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public AnnuncioDTO updateParziale(@PathVariable Long id,
                                      @RequestPart("dto") AnnuncioUpdateDTO dtoRequestPart,
                                      @RequestPart(name = "image", required = false) MultipartFile image,
                                      @AuthenticationPrincipal UserDetails userDetails) {

        AnnuncioUpdateDTO dto = new AnnuncioUpdateDTO(
                dtoRequestPart.titolo(),
                dtoRequestPart.descrizione(),
                dtoRequestPart.prezzo(),
                dtoRequestPart.taglia(),
                dtoRequestPart.condizioni(),
                dtoRequestPart.isAvailable(),
                dtoRequestPart.categoriaPrincipale(),
                dtoRequestPart.categoria(),
                image
        );

        return annuncioService.update(id, dto, userDetails.getUsername());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public void delete(@PathVariable Long id,
                       @AuthenticationPrincipal UserDetails userDetails) {
        annuncioService.delete(id, userDetails.getUsername());
    }

    @PostMapping(value = "/{id}/image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public AnnuncioDTO uploadNewImage(
            @PathVariable Long id,
            @RequestPart("image") MultipartFile image,
            @AuthenticationPrincipal User user) {
        return annuncioService.uploadNewImage(id, user, image);
    }

    @GetMapping("/user/{username}")
    public List<AnnuncioDTO> getAnnunciBySellerUsername(@PathVariable String username) {
        return annuncioService.findByUsername(username);
    }
}

