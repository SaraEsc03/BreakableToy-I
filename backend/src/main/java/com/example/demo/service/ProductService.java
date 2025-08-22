package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import com.example.demo.dto.Metrics;
import com.example.demo.model.Product;

public interface ProductService {

    Product createProduct(Product product);

    Product updateProduct(Integer id, Product product);

    List<Product> getProducts(
            Optional<String> nameFilter,
            Optional<List<String>> categoryFilter,
            Optional<Boolean> inStockFilter,
            Optional<String> Sort1,
            Optional<String> Sort2,
            int page
    );

    Product markOutOfStock(Integer id);

    Product markInStock(Integer id);

    Metrics getMetrics();

}
