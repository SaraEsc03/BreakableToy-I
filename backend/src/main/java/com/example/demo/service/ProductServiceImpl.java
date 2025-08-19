package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.demo.model.Product;

@Service
public class ProductServiceImpl implements ProductService {

    @Override
    public Product createProduct(Product product) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public Product updateProduct(Long id, Product product) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public List<Product> getProducts(Optional<String> nameFilter, Optional<List<String>> categoryFilter, Optional<Boolean> inStockFilter, Optional<String> Sort1, Optional<String> Sort2, int page) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public Product markOutOfStock(Long id) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public Product markInStock(Long id) {
        throw new UnsupportedOperationException("Not supported yet.");
    }


    }
    
