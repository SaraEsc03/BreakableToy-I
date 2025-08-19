package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import com.example.demo.model.Product;

public interface ProductService {
    Product createProduct(Product product);

    Product updateProduct(Long id, Product product);

    List <Product> getProducts(
        Optional<String> nameFilter,
        Optional<List<String>> categoryFilter,
        Optional<Boolean> inStockFilter,
        Optional<String> Sort1,
        Optional<String> Sort2,
        int page
    );

    Product markOutOfStock (Long id);

    Product markInStock (Long id);
    


}
