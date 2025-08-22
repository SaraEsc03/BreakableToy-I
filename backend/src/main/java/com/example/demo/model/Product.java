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
    private String Name;

    @NotNull
    private String Category;

    @NotNull
    @Min(value = 0)
    private float Price;

    @FutureOrPresent
    private LocalDate ExpirationDate;

    @NotNull
    @Min(value = 0)
    private int QuantityInStock;

    private LocalDate CreationDate;

    private LocalDate UpdateDate;

    // CONSTRUCTOR
    public Product(Integer id, String Name, String Category, float Price, LocalDate ExpirationDate, int QuantityInStock) {
        this.id = id;
        this.Name = Name;
        this.Category = Category;
        this.Price = Price;
        this.ExpirationDate = ExpirationDate;
        this.QuantityInStock = QuantityInStock;
    }

    public String getName() {
        return Name;
    }

    public String getCategory() {
        return Category;
    }

    public float getPrice() {
        return Price;
    }

    public LocalDate getExpirationDate() {
        return ExpirationDate;
    }

    public Integer getQuantityInStock() {
        return QuantityInStock;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.CreationDate = creationDate;
    }

    public void setUpdateDate(LocalDate updateDate) {
        this.UpdateDate = updateDate;
    }

    public void setQuantityInStock(Integer quantity) {
        this.QuantityInStock = quantity;
    }
}
