package alessandro.digiovanni.demo.controllers;

import alessandro.digiovanni.demo.payloads.OrdineDTO;
import alessandro.digiovanni.demo.services.OrdineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ordini")
public class OrdineController {

    @Autowired
    private OrdineService ordineService;


    @PostMapping("/{userId}/crea")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public OrdineDTO creaOrdine(@PathVariable Long userId) {
        return ordineService.creaOrdineDaCarrello(userId);
    }


    @GetMapping("/utente/{userId}")
    @PreAuthorize("hasRole('ADMIN') or principal.username == @userService.getUsernameById(#userId)")
    public List<OrdineDTO> getOrdiniUtente(@PathVariable Long userId) {
        return ordineService.getOrdiniUtente(userId);
    }
}
