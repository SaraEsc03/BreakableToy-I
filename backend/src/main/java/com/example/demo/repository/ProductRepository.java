package com.example.demo.repository;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.example.demo.model.Product;

@Repository
public class ProductRepository {
    private Map<Integer,Product> productMap= new HashMap<>();  
    
    public Product findProductById(Integer id){
        return productMap.get(id);
    }

    public List<Product> findAll(){
        return new ArrayList<>(productMap.values());
    }

    private int idCounter=1;
    public Boolean saveNewProduct(Product product){
        boolean exists=productMap.values().stream().anyMatch(p->p.getName().equalsIgnoreCase(product.getName()));
        
        if (!exists){
            productMap.put(idCounter, product);
            idCounter++;
            return true;
        }else{
            return false;
        }
    }
    
    public Boolean deleteById(Integer id){
        if(productMap.containsKey(id)){
            productMap.remove(id);
            return true;
        }else{
            return false;
        }
    }    

    public Boolean updateById(Integer id, Product product){
        if(productMap.containsKey(id)){
            productMap.replace(id, product);
            return true;
        }else{
            return false;
        }
    }

        

    }
