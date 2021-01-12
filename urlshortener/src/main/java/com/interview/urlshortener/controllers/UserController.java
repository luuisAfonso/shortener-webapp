package com.interview.urlshortener.controllers;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.interview.urlshortener.dtos.UrlDto;
import com.interview.urlshortener.dtos.UserDTO;
import com.interview.urlshortener.entities.Url;
import com.interview.urlshortener.entities.User;
import com.interview.urlshortener.repositories.UserRepository;
import com.interview.urlshortener.services.UrlIdGeneratorService;
import org.apache.coyote.Response;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;

import static com.interview.urlshortener.security.SecurityConstants.*;


@RestController
@RequestMapping("/user")
public class UserController {

    private final UrlIdGeneratorService randomGeneratorService;
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserController(UrlIdGeneratorService randomGeneratorService, UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.randomGeneratorService = randomGeneratorService;
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @GetMapping("/all")
    ResponseEntity<List<User>> getAll() {
        return ResponseEntity.ok(this.userRepository.findAll());
    }

    @GetMapping("/{id}")
    ResponseEntity<User> findById(@PathVariable Long id) {
        User user = this.userRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("User with " + id + " not found."));

        return ResponseEntity.ok(user);
    }

    @GetMapping("/dto/{id}")
    ResponseEntity<UserDTO> findDTOById(@PathVariable Long id) {
        UserDTO userDto = this.userRepository.findById(id).map(user -> new UserDTO(user)).orElseThrow(
                () -> new ResourceNotFoundException("User with " + id + " not found."));
        return ResponseEntity.ok(userDto);
    }

    @PostMapping("/sign-up")
    ResponseEntity<?> signUp(@RequestBody User user) {
        if(userRepository.findByEmail(user.getEmail()) != null) {
            return ResponseEntity.badRequest().body("Email is already taken");
        }

        if(user.getUrls() != null) { user.getUrls().forEach(url -> url.setUser(user)); }
        user.setCreationDate(LocalDate.now());
        user.setLastLogin(LocalDate.now());

        user.setSalt(randomGeneratorService.generateStringRandomString());
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword() + user.getSalt()));

        ResponseEntity.ok(this.userRepository.save(user));
        String token = JWT.create()
                .withSubject(user.getEmail())
                .withExpiresAt(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .sign(Algorithm.HMAC256(SECRET.getBytes()));
        Map resultToken = new HashMap();
        resultToken.put(TOKEN_STRING, TOKEN_PREFIX + token);
        return ResponseEntity.ok(resultToken);
    }

    @PostMapping("/log-out")
    ResponseEntity<?> logout(@RequestHeader String Authorization) {
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    ResponseEntity<User> updateById(@PathVariable Long id, @RequestBody User user) {
        User foundUser = userRepository.findById(id).map(userFunded -> {
            userFunded.setName(user.getName());
            userFunded.setEmail(user.getEmail());
            return this.userRepository.save(userFunded);
        }).orElseThrow(() -> new ResourceNotFoundException("User id " + id + " not found."));

        return ResponseEntity.ok(foundUser);
    }

    @PutMapping("{userEmail}/add-url")
    ResponseEntity<Url> addUrl(@PathVariable String userEmail, @RequestBody UrlDto originalUrl) {
        User foundUser = Optional.of(userRepository.findByEmail(userEmail)).map(user -> {
            Url url = Url.build(originalUrl.getUrl());
            user.getUrls().add(url);
            url.setUser(user);
            return userRepository.save(user);
        }).orElseThrow(() -> new ResourceNotFoundException("User id: " + userEmail + " not found."));

        return ResponseEntity.ok(foundUser.getUrls().get(foundUser.getUrls().size() - 1));
    }

    @PutMapping("{userEmail}/delete-url/{urlId}/")
    ResponseEntity<User> addUrl(@PathVariable String userEmail, @RequestBody Url url, @PathVariable String urlId) {
        User foundUser = Optional.of(userRepository.findByEmail(userEmail)).map(user -> {
            user.getUrls().remove(urlId);
            url.setUser(null);
            return userRepository.save(user);
        }).orElseThrow(() -> new ResourceNotFoundException("User email: " + userEmail + " not found."));

        return ResponseEntity.ok(foundUser);
    }

    @DeleteMapping("/delete/{id}")
    ResponseEntity<?> deleteById(@PathVariable Long id) {
        return userRepository.findById(id).map(user -> {
            userRepository.delete(user);
            return ResponseEntity.ok().build();
        }).orElseThrow(() -> new ResourceNotFoundException("User id " + id + " not found."));
    }

}
