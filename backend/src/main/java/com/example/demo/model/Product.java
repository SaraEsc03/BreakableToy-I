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
    private Long id;
    
    @Size(max= 120)
    @NotNull
    private String Name;

    @NotNull
    private String Category;

    @NotNull
    @Min(value=0)
    private float Price;

    @FutureOrPresent
    private LocalDate ExpirationDate;

    @NotNull
    @Min(value=0)
    private int QuantityInStock;

    private LocalDate CreationDate;

    private LocalDate UpdateDate;


    public Product(Long id, String Name, String Category, float Price, 
    LocalDate ExpirationDate, int QuantityInStock, LocalDate CreationDate, LocalDate UpdateDate){
        this.id= id;
        this.Name= Name;
        this.Category= Category;
        this.Price= Price;
        this.ExpirationDate= ExpirationDate;
        this.QuantityInStock= QuantityInStock;
        this.CreationDate= CreationDate;
        this.UpdateDate= UpdateDate;
    }

    public String getName() {
        return Name;
    }


}