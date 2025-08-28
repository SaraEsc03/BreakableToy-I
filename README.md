# BreakableToy-I: Inventory Management
This project is a simple Inventory App built with Spring Boot (backend) and React + TypeScript (frontend) for managing products. Data is stored in memory, so no database setup is required.

## Features
  - List all products with pagination.
  - Add, update, and delete products.
  - Filter products by category and search by name.
  - Mark products as out-of-stock and restore previous stock.
  - Metrics on total products, total stock, and average price.
  - Frontend with React, Vite, and TypeScript.

## Getting Started
### Prerequisites
  - Node.js & npm
  - Java 17+
  - Maven (for backend)

## Running the App
Backend:
cd backend
mvn spring-boot:run

The API will be available at http://localhost:9090/product.

## Frontend:
cd frontend
npm install
npm run dev

Visit http://localhost:5173 to use the app.
