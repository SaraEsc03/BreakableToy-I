package com.example.demo.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.Metrics;
import com.example.demo.model.Product;
import com.example.demo.service.ProductService;

//PRODUCTS REQUESTS
@RestController
@RequestMapping("/product")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<?> getProducts(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) List<String> category,
            @RequestParam(required = false) Boolean inStock,
            @RequestParam(required = false) String sort1,
            @RequestParam(required = false) String sort2,
            @RequestParam(defaultValue = "0") int page
    ) {
        List<Product> products = productService.getProducts(
                Optional.ofNullable(name),
                Optional.ofNullable(category),
                Optional.ofNullable(inStock),
                Optional.ofNullable(sort1),
                Optional.ofNullable(sort2),
                page
        );

        Metrics metrics = productService.getMetrics();

        Map<String, Object> response = new HashMap<>();
        response.put("products", products);
        response.put("metrics", metrics);
        response.put("currentPage", page);
        response.put("productsPerPage", 10); 

        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        Product created = productService.createProduct(product);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProductById(
            @PathVariable int id,
            @RequestBody Product product
    ) {
        Product updatedProduct = productService.updateProduct(id, product);
        return ResponseEntity.ok(updatedProduct);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Product> deleteProductById(@PathVariable int id) {
        Product deletedProduct = productService.deleteById(id);
        return ResponseEntity.ok(deletedProduct);
    }

    @PostMapping("/{id}/markoutofstock")
    public ResponseEntity<Product> markoutOfStock(@PathVariable int id) {
        Product markedProduct = productService.markOutOfStock(id);
        return ResponseEntity.ok(markedProduct);
    }

    @PutMapping("/{id}/instock")
    public ResponseEntity<Product> markInStock(@PathVariable int id) {
        Product markedProduct = productService.markInStock(id);
        return ResponseEntity.ok(markedProduct);
    }

}
