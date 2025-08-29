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

### Running the App
### Backend:
```
cd backend
mvn spring-boot:run
```

The API will be available at http://localhost:9090/product.

### Frontend:
```
cd frontend
npm install
npm run dev
```

Visit http://localhost:8080 to use the app.

## API Documentation
### GET/ product
| Name     | Type       | Description                          |
|----------|-----------|---------------------------------------|
| name     | string    | Filters products by name (optional)   |
| category | string[]  | Filter by category (optional)         |
| inStock  | boolean   | Filter by stock (optional)            |
| sort1    | string    | Primary sort (optional)               |
| sort2    | string    | Secondary sort (optional)             |
| page     | number    | Pagination index (optional)           |

### POST/ product
| Property     | Type  |
|----------|-----------|
| name     | string    | 
| category | string  | 
| price  | float   | 
| quantityInStock    | integer    | 
| expirationDate    | LocalDate (optional)    |

### PUT/ product/ {id}
| Property     | Type  |
|----------|-----------|
| name     | string (optional)    | 
| category | string (optional)   | 
| price  | float (optional)    | 
| quantityInStock    | integer (optional) | 
| expirationDate    | LocalDate (optional)    |

### DELETE/ product/ {id}

### POST/ product/ {id}/ markOutOfStock

### POST/ product/ {id}/ markInStock


> [!NOTE]
>  - All data is stored in memory. On server restart, all products will be lost.
>  - Metrics are automatically calculated on every product fetch.
>  - Frontend fetches from API using axios and updates table dynamically.
>  - This app handles a global Montserrat font. You can download it right here: https://font.download/font/montserrat



