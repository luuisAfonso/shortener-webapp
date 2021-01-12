package com.interview.urlshortener.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "url")
@Data
public class Url {

    public static Url build(String originalUrl) {
        Url url = new Url();
        LocalDate creationDate = LocalDate.now();
        url.setCreationDate(creationDate);
        url.setCreationTime(LocalTime.now());
        url.setExpirationDate(LocalDate.of(creationDate.getYear() + 1, creationDate.getMonth(), creationDate.getDayOfMonth()));
        url.setOriginalUrl(originalUrl);

        return url;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "url_seq")
    @GenericGenerator(
            name = "url_seq",
            strategy = "com.interview.urlshortener.generators.UrlBase62IdGenerator")
    private String id;

    @Column
    private String originalUrl;

    @Column
    private LocalDate creationDate;

    @Column
    private LocalTime creationTime;

    @Column
    private LocalDate expirationDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;

}
