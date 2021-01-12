package com.interview.urlshortener.controllers;

import com.interview.urlshortener.dtos.UrlDto;
import com.interview.urlshortener.entities.Url;
import com.interview.urlshortener.repositories.UrlRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/url")
public class UrlController {
    private final UrlRepository urlRepository;

    public UrlController(UrlRepository urlRepository) {
        this.urlRepository = urlRepository;
    }

    @GetMapping("/{id}")
    ResponseEntity<Url> getUrlById(@PathVariable String id) {
        Url url = urlRepository.findById(id).orElseThrow(() ->
            new ResourceNotFoundException("Url with " + id + " not found."));

        return ResponseEntity.ok(url);
    }

    @PostMapping()
    ResponseEntity<Url> crateUrl(@RequestBody UrlDto originalUrl) {
        return ResponseEntity.ok(this.urlRepository.save(Url.build(originalUrl.getUrl())));
    }

    @GetMapping("/by-user-email/{userEmail}")
    ResponseEntity<Page<Url>> pageableUrlsByUserEmail(@PathVariable String userEmail, Pageable pageable) {
        return ResponseEntity.ok(urlRepository.findByUserEmail(userEmail, pageable));
    }
}
