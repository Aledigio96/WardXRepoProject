package alessandro.digiovanni.demo.controllers;


import alessandro.digiovanni.demo.payloads.AnnuncioDTO;
import alessandro.digiovanni.demo.payloads.SearchResultDTO;
import alessandro.digiovanni.demo.payloads.UserDTO;

import alessandro.digiovanni.demo.services.SearchService;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("/api/search")
public class SearchController {

    private final SearchService searchService;

    public SearchController(SearchService searchService) {
        this.searchService = searchService;
    }

    @GetMapping
    public ResponseEntity<SearchResultDTO> search(@RequestParam("query") String query) {
        if (query == null || query.trim().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        List<AnnuncioDTO> annunci = searchService.searchAnnunci(query);
        List<UserDTO> utenti = searchService.searchUsers(query);

        return ResponseEntity.ok(new SearchResultDTO(annunci, utenti));
    }
}

