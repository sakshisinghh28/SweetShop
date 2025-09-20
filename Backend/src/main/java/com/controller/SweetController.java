package com.controller;

import com.dto.SweetDto;
import com.entity.Sweet;
import com.service.SweetService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sweets")
public class SweetController {

    private final SweetService sweetService;

    public SweetController(SweetService sweetService) { this.sweetService = sweetService; }

    @PostMapping
    public ResponseEntity<Sweet> add(@Valid @RequestBody SweetDto dto){
        Sweet s = sweetService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(s);
    }

    @GetMapping
    public List<Sweet> all(){ return sweetService.findAll(); }

    @GetMapping("/search")
    public List<Sweet> search(@RequestParam(required = false) String name,
                              @RequestParam(required = false) String category,
                              @RequestParam(required = false) Double minPrice,
                              @RequestParam(required = false) Double maxPrice){
        return sweetService.search(name, category, minPrice, maxPrice);
    }

    @PutMapping("/{id}")
    public Sweet update(@PathVariable Long id, @Valid @RequestBody SweetDto dto){
        return sweetService.update(id, dto);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> delete(@PathVariable Long id){
        sweetService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/purchase")
    public ResponseEntity<?> purchase(@PathVariable Long id, @RequestParam(defaultValue = "1") Integer qty){
        sweetService.purchase(id, qty);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/restock")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> restock(@PathVariable Long id, @RequestParam Integer qty){
        sweetService.restock(id, qty);
        return ResponseEntity.ok().build();
    }
}
