package com.service;

import com.dto.SweetDto;
import com.entity.Sweet;
import com.exception.InsufficientStockException;
import com.exception.ResourceNotFoundException;
import com.repository.SweetRepository;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class SweetService {

    private final SweetRepository sweetRepository;

    public SweetService(SweetRepository sweetRepository) {
        this.sweetRepository = sweetRepository;
    }

    public Sweet create(SweetDto dto){
        Sweet s = new Sweet();
        s.setName(dto.getName());
        s.setCategory(dto.getCategory());
        s.setPrice(dto.getPrice());
        s.setQuantity(dto.getQuantity());
        return sweetRepository.save(s);
    }

    public List<Sweet> findAll(){
        return sweetRepository.findAll();
    }

    public Sweet update(Long id, SweetDto dto){
        Sweet s = sweetRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Sweet not found"));
        s.setName(dto.getName());
        s.setCategory(dto.getCategory());
        s.setPrice(dto.getPrice());
        s.setQuantity(dto.getQuantity());
        return sweetRepository.save(s);
    }

    public void delete(Long id){
        sweetRepository.deleteById(id);
    }

    public List<Sweet> search(String name, String category, Double minPrice, Double maxPrice){
        Specification<Sweet> spec = Specification.where(null);
        if (name != null) spec = spec.and((root, q, cb) -> cb.like(cb.lower(root.get("name")), "%" + name.toLowerCase() + "%"));
        if (category != null) spec = spec.and((root, q, cb) -> cb.equal(cb.lower(root.get("category")), category.toLowerCase()));
        if (minPrice != null) spec = spec.and((root, q, cb) -> cb.ge(root.get("price"), minPrice));
        if (maxPrice != null) spec = spec.and((root, q, cb) -> cb.le(root.get("price"), maxPrice));
        return sweetRepository.findAll(spec);
    }

    @Transactional
    public void purchase(Long id, int qty){
        Sweet s = sweetRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Sweet not found"));
        if (s.getQuantity() < qty) throw new InsufficientStockException("Not enough stock");
        s.setQuantity(s.getQuantity() - qty);
        sweetRepository.save(s);
    }

    @Transactional
    public void restock(Long id, int qty){
        Sweet s = sweetRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Sweet not found"));
        s.setQuantity(s.getQuantity() + qty);
        sweetRepository.save(s);
    }
}
