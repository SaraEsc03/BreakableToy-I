package com.example.demo.dto;

import java.util.HashMap;
import java.util.Map;

public class Metrics {

    private Map<String, CategoryMetrics> categoryMetrics = new HashMap<>();

    private CategoryMetrics overallMetrics;

    public static class CategoryMetrics {

        private int totalProducts;
        private int totalStock;
        private double totalValue;
        private double averagePrice;

        public CategoryMetrics() {
        }

        public CategoryMetrics(int totalProducts, int totalStock, double totalValue, double averagePrice) {
            this.totalProducts = totalProducts;
            this.totalStock = totalStock;
            this.totalValue = totalValue;
            this.averagePrice = averagePrice;
        }

        public int getTotalProducts() {
            return totalProducts;
        }

        public void setTotalProducts(int totalProducts) {
            this.totalProducts = totalProducts;
        }

        public int getTotalStock() {
            return totalStock;
        }

        public void setTotalStock(int totalStock) {
            this.totalStock = totalStock;
        }

        public double getTotalValue() {
            return totalValue;
        }

        public void setTotalValue(double totalValue) {
            this.totalValue = totalValue;
        }

        public double getAveragePrice() {
            return averagePrice;
        }

        public void setAveragePrice(double averagePrice) {
            this.averagePrice = averagePrice;
        }
    }

    public Map<String, CategoryMetrics> getCategoryMetrics() {
        return categoryMetrics;
    }

    public void setCategoryMetrics(Map<String, CategoryMetrics> categoryMetrics) {
        this.categoryMetrics = categoryMetrics;
    }

    public CategoryMetrics getOverallMetrics() {
        return overallMetrics;
    }

    public void setOverallMetrics(CategoryMetrics overallMetrics) {
        this.overallMetrics = overallMetrics;
    }
}
