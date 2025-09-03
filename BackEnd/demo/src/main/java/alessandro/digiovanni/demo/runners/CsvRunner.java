package alessandro.digiovanni.demo.runners;


import alessandro.digiovanni.demo.repositories.ProvinciaRepository;
import alessandro.digiovanni.demo.services.ProvinciaImporter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class CsvRunner {

    @Autowired
    private ProvinciaImporter provinciaImporter;
    @Autowired
    private ProvinciaRepository provinciaRepository;

    @Value("${path.province}")
    private String pathProvince;


    public void importProvincesIfNeeded() throws Exception {
        if (provinciaRepository.count() == 0) {
            provinciaImporter.importaDaCsv(pathProvince);
            System.out.println("Importazione province completata.");
        } else {
            System.out.println("Province già presenti nel database.");
        }
    }
}