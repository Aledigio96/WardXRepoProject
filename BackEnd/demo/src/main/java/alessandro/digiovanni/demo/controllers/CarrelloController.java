package alessandro.digiovanni.demo.controllers;

import alessandro.digiovanni.demo.payloads.CarrelloDTO;
import alessandro.digiovanni.demo.services.CarrelloService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/carrelli")
public class CarrelloController {

    @Autowired
    private CarrelloService carrelloService;


    @GetMapping("/{userId}")
    @PreAuthorize("hasRole('ADMIN') or principal.username == @userService.getUsernameById(#userId)")
    public CarrelloDTO getCarrello(@PathVariable Long userId) {
        return carrelloService.getCarrelloByUserId(userId);
    }


    @PostMapping("/{userId}/annunci/{annuncioId}")
    @PreAuthorize("hasRole('ADMIN') or principal.username == @userService.getUsernameById(#userId)")
    public CarrelloDTO aggiungiAnnuncio(@PathVariable Long userId,
                                        @PathVariable Long annuncioId) {
        return carrelloService.addAnnuncioToCarrello(userId, annuncioId);
    }


    @DeleteMapping("/{userId}/annunci/{annuncioId}")
    @PreAuthorize("hasRole('ADMIN') or principal.username == @userService.getUsernameById(#userId)")
    public CarrelloDTO rimuoviAnnuncio(@PathVariable Long userId,
                                       @PathVariable Long annuncioId) {
        return carrelloService.removeAnnuncioFromCarrello(userId, annuncioId);
    }


    @DeleteMapping("/{userId}/svuota")
    @PreAuthorize("hasRole('ADMIN') or principal.username == @userService.getUsernameById(#userId)")
    public void svuotaCarrello(@PathVariable Long userId) {
        carrelloService.svuotaCarrello(userId);
    }


}
