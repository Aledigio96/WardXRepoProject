package alessandro.digiovanni.demo.runners;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class UnifiedRunner implements CommandLineRunner {

    @Autowired
    private CsvRunner csvRunner;

    @Autowired
    private CreatoreAdmin creatoreAdmin;

    @Override
    public void run(String... args) throws Exception {
        csvRunner.importProvincesIfNeeded();
        creatoreAdmin.createAdminIfNeeded();
    }
}