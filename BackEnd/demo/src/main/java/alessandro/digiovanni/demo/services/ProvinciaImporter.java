package alessandro.digiovanni.demo.services;

import alessandro.digiovanni.demo.entities.Provincia;
import alessandro.digiovanni.demo.repositories.ProvinciaRepository;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.nio.charset.StandardCharsets;

@Service
public class ProvinciaImporter {

    @Autowired
    private ProvinciaRepository provinciaRepository;

    public void importaDaCsv(String filePath) throws IOException {
        try (
                InputStream is = getClass().getClassLoader().getResourceAsStream(filePath);
                Reader reader = new InputStreamReader(is, StandardCharsets.UTF_8);
                CSVParser csvParser = new CSVParser(reader,
                        CSVFormat.DEFAULT
                                .withDelimiter(';')
                                .withFirstRecordAsHeader()
                                .withIgnoreSurroundingSpaces()
                )
        ) {
            for (CSVRecord record : csvParser) {
                Provincia provincia = new Provincia();
                provincia.setSigla(record.get("Sigla"));
                provincia.setProvincia(record.get("Provincia"));
                provincia.setRegione(record.get("Regione"));
                provinciaRepository.save(provincia);
            }
        }
    }
}