package com.example.demo.repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.stereotype.Repository;

import com.example.demo.model.Product;

@Repository
public class ProductRepository {

    private Map<Integer, Product> productMap = new HashMap<>();
    private Set<String> categories = new HashSet<>();

    public Product findProductById(Integer id) {
        return productMap.get(id);
    }

    public List<Product> findAll() {
        return new ArrayList<>(productMap.values());
    }

    private int idCounter = 1;

    public Boolean saveNewProduct(Product product) {
        boolean exists = productMap.values().stream().anyMatch(p -> p.getName().equalsIgnoreCase(product.getName()));

        if (!exists) {
            product.setId(idCounter);
            productMap.put(idCounter, product);
            categories.add(product.getCategory());
            idCounter++;
            return true;
        } else {
            return false;
        }
    }

    public Boolean deleteById(Integer id) {
        if (productMap.containsKey(id)) {
            productMap.remove(id);
            return true;
        } else {
            return false;
        }
    }

    public Boolean updateById(Integer id, Product product) {
        if(productMap.containsKey(id)){
            product.setId(id);
            productMap.put(id,product);
            return true;
        }
        return false;
    }

    public Set<String> getCategories() {
        return categories;
    }

}
