package com.interview.urlshortener.repositories;

import com.interview.urlshortener.entities.Url;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UrlRepository extends JpaRepository<Url, String> {
    Page<Url> findByUserEmail(String email, Pageable pageable);
}
