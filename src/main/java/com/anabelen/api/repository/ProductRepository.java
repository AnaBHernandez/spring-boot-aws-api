package com.anabelen.api.repository; 

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Repository;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.anabelen.api.model.Product;

@Repository
public class ProductRepository {

    private final DynamoDBMapper dynamoDBMapper;

    public ProductRepository(DynamoDBMapper dynamoDBMapper) {
        this.dynamoDBMapper = dynamoDBMapper;
    }

    public Product save(Product product) {
        dynamoDBMapper.save(product);
        return product;
    }

    public Optional<Product> findById(String id) { 
        return Optional.ofNullable(dynamoDBMapper.load(Product.class, id));
    }

    public List<Product> findAll() {
        return dynamoDBMapper.scan(Product.class, new DynamoDBScanExpression())
                .stream()
                .collect(Collectors.toList());
    }

    public void deleteById(String id) { 
        Product productToDelete = dynamoDBMapper.load(Product.class, id);
        if (productToDelete != null) {
            dynamoDBMapper.delete(productToDelete);
        }
    }


}