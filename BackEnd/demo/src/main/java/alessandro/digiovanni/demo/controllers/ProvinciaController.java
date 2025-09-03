package alessandro.digiovanni.demo.controllers;

import alessandro.digiovanni.demo.entities.Provincia;
import alessandro.digiovanni.demo.services.ProvinciaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/province")
public class ProvinciaController {

    @Autowired
    private ProvinciaService provinciaService;

    @GetMapping
    public List<Provincia> getAllProvince() {
        return provinciaService.findAll();
    }
    @GetMapping("/{sigla}")
    public Provincia getProvinciaBySigla(@PathVariable String sigla) {
        return provinciaService.findBySigla(sigla)
                .orElse(null);
    }
}