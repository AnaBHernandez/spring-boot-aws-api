package com.anabelen.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.anabelen.api.model.Product;
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    
 }