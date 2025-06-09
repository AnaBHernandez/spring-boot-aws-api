package com.anabelen.api; 
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDB; // Necesaria para @Value
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;

@Configuration
public class DynamoDBConfig {

    
    @Value("${amazon.aws.region:us-east-1}") 
    private String amazonAWSRegion;

    @Bean
    public DynamoDBMapper dynamoDBMapper() {
        return new DynamoDBMapper(buildAmazonDynamoDBClient());
    }

    private AmazonDynamoDB buildAmazonDynamoDBClient() {
        
        return AmazonDynamoDBClientBuilder.standard()
                .withRegion(amazonAWSRegion) 
                .build();
    }
}