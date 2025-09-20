package com.repository;

import com.entity.Sweet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import java.util.Optional;

public interface SweetRepository extends JpaRepository<Sweet, Long>, JpaSpecificationExecutor<Sweet> {
    Optional<Sweet> findByName(String name);
}
