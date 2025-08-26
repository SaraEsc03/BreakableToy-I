package com.example.demo.service;

import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.demo.dto.Metrics;
import com.example.demo.model.Product;
import com.example.demo.repository.ProductRepository;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository pr;

    public ProductServiceImpl(ProductRepository pr) {
        this.pr = pr;
    }

    //IMPLEMENTED METHODS
    //CREATE PRODUCT
    @Override
    public Product createProduct(Product product) {
        boolean savedValue = pr.saveNewProduct(product);

        if (!savedValue) {
            throw new IllegalArgumentException("This product already exists");
        }

        product.setCreationDate(LocalDate.now());
        product.setUpdateDate(LocalDate.now());

        return product;
    }

    //UPDATE PRODUCT
    @Override
    public Product updateProduct(Integer id, Product product) {
        boolean savedValue = pr.updateById(id, product);

        if (!savedValue) {
            throw new IllegalArgumentException("This product doesn't exist");
        }

        pr.updateById(id, product);
        product.setUpdateDate(LocalDate.now());
        return product;
    }

    //DELETE PRODUCT
    @Override
    public Product deleteById(Integer id) {
        Product product = pr.findProductById(id);

        if (product == null) {
            throw new IllegalArgumentException("This product doesn't exist");
        } else {
            pr.deleteById(id);
            return product;
        }
    }

    //MARK OUT OF STOCK
    @Override
    public Product markOutOfStock(Integer id) {
        Product product = pr.findProductById(id);

        if (product == null) {
            throw new IllegalArgumentException("This product doesn't exist");
        }

        if (product.getQuantityInStock() == 0) {
            throw new IllegalStateException("This product is already out of stock");
        }

        product.setPreviousQuantity(product.getQuantityInStock());

        product.setQuantityInStock(0);

        pr.updateById(id, product);
        return product;
    }

    //MARK IN STOCK
    @Override
    public Product markInStock(Integer id) {
        Product product = pr.findProductById(id);

        if (product == null) {
            throw new IllegalArgumentException("This product doesn't exist");
        }

        if (product.getQuantityInStock() > 0) {
            throw new IllegalStateException("This product is already in stock");
        }

        int restoreStock = product.getPreviousQuantity() != null ? product.getPreviousQuantity() : 10;

        product.setQuantityInStock(restoreStock);

        pr.updateById(id, product);
        return product;
    }

    //FILTERS AND SORTS
    @Override
    public List<Product> getProducts(Optional<String> nameFilter,
            Optional<List<String>> categoryFilter, Optional<Boolean> inStockFilter,
            Optional<String> Sort1, Optional<String> Sort2, int page) {
        List<Product> productsList = pr.findAll();

        //NAME FILTER
        if (nameFilter.isPresent()) {
            String subText = nameFilter.get().toLowerCase();

            productsList = productsList.stream().
                    filter(p -> p.getName().toLowerCase().contains(subText)).
                    toList();
        }

        //CATEGORIES FILTER
        if (categoryFilter.isPresent() && !categoryFilter.isEmpty()) {
            List<String> categories = categoryFilter.get();

            productsList = productsList.stream().
                    filter(p -> categories.stream().anyMatch(c -> c.equalsIgnoreCase(p.getCategory()))).toList();
        }

        //INSTOCK FILTER
        if (inStockFilter.isPresent()) {
            boolean availability = inStockFilter.get();

            productsList = productsList.stream().
                    filter(p -> availability ? p.getQuantityInStock() > 0
                    : p.getQuantityInStock() == 0).toList();
        }

        //SORTS
        if (Sort1.isPresent()) {
            Comparator<Product> cmp = buildComparator(Sort1.get());
            if (Sort2.isPresent()) {
                cmp = cmp.thenComparing(buildComparator(Sort2.get()));
            };

            productsList = productsList.stream().sorted(cmp).toList();
        }

        //PAGES(10 PRODUCTS PER PAGE)
        int productsPerPage = 10;
        int x = Math.max(0, page) * productsPerPage;
        int y = Math.min(x + productsPerPage, productsList.size());

        return productsList.subList(x, y);
    }

    //COMPARATOR FUNCTION
    private Comparator<Product> buildComparator(String sortGet) {
        return switch (sortGet.toLowerCase()) {
            case "name" ->
                Comparator.comparing(Product::getName, String.CASE_INSENSITIVE_ORDER);
            case "category" ->
                Comparator.comparing(Product::getCategory, String.CASE_INSENSITIVE_ORDER);
            case "price" ->
                Comparator.comparingDouble(Product::getPrice);
            case "expirationdate" ->
                Comparator.comparing(Product::getExpirationDate, Comparator.nullsLast(Comparator.naturalOrder()));
            case "quantityinstock" ->
                Comparator.comparingInt(Product::getQuantityInStock);

            default ->
                throw new IllegalArgumentException("Criterio de orden no válido");
        };

    }

    ;

    //METRICS
    @Override
    public Metrics getMetrics() {
        Metrics dto = new Metrics();

        Metrics.CategoryMetrics overall = new Metrics.CategoryMetrics();
        int overallProducts = 0;
        int overallStock = 0;
        double overallValue = 0.0;

        for (String category : pr.getCategories()) {
            List<Product> productsInCategory = pr.findAll().stream()
                    .filter(p -> p.getCategory().equalsIgnoreCase(category))
                    .toList();

            int totalProducts = productsInCategory.size();
            int totalStock = productsInCategory.stream().mapToInt(Product::getQuantityInStock).sum();
            double totalValue = productsInCategory.stream()
                    .mapToDouble(p -> p.getQuantityInStock() * p.getPrice())
                    .sum();
            double averagePrice = totalProducts > 0
                    ? productsInCategory.stream().mapToDouble(Product::getPrice).average().orElse(0.0)
                    : 0.0;

            Metrics.CategoryMetrics categoryMetrics = new Metrics.CategoryMetrics(
                    totalProducts, totalStock, totalValue, averagePrice
            );

            dto.getCategoryMetrics().put(category, categoryMetrics);

            overallProducts += totalProducts;
            overallStock += totalStock;
            overallValue += totalValue;
        }

        double overallAveragePrice = overallProducts > 0 ? overallValue / overallStock : 0.0;

        overall.setTotalProducts(overallProducts);
        overall.setTotalStock(overallStock);
        overall.setTotalValue(overallValue);
        overall.setAveragePrice(overallAveragePrice);

        dto.setOverallMetrics(overall);

        return dto;
    }

}
