package alessandro.digiovanni.demo.services;

import alessandro.digiovanni.demo.entities.Provincia;
import alessandro.digiovanni.demo.repositories.ProvinciaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProvinciaService {

    @Autowired
    private ProvinciaRepository provinciaRepository;

    public List<Provincia> findAll() {
        return provinciaRepository.findAll();
    }

    public Optional<Provincia> findBySigla(String sigla) {
        return provinciaRepository.findBySigla(sigla);
    }


}