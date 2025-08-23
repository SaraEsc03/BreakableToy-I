package com.example.demo.model;

import java.time.LocalDate;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Size(max = 120)
    @NotNull
    private String name;

    @NotNull
    private String category;

    @NotNull
    @Min(value = 0)
    private float price;

    @FutureOrPresent
    private LocalDate expirationDate;

    @NotNull
    @Min(value = 0)
    private int quantityInStock;

    private LocalDate creationDate;

    private LocalDate updateDate;

    // CONSTRUCTOR
    public Product(Integer id, String name, String category, float price, LocalDate expirationDate, int quantityInStock) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
        this.expirationDate = expirationDate;
        this.quantityInStock = quantityInStock;
    }

    public String getName() {
        return name;
    }

    public String getCategory() {
        return category;
    }

    public float getPrice() {
        return price;
    }

    public LocalDate getExpirationDate() {
        return expirationDate;
    }

    public Integer getQuantityInStock() {
        return quantityInStock;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }

    public void setUpdateDate(LocalDate updateDate) {
        this.updateDate = updateDate;
    }

    public void setQuantityInStock(Integer quantity) {
        this.quantityInStock = quantity;
    }
}
