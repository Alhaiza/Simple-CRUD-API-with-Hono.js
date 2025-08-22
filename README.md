# Hono.js CRUD Example

This project is a simple CRUD backend built with [Hono.js](https://hono.dev/) running on [Deno](https://deno.land/), and connected to a MySQL database.  
It was created as my first experience exploring backend development with JavaScript/TypeScript outside of PHP & Laravel.

## Features

- Connects to a MySQL database
- Basic CRUD operations for `products`:
  - Create a product
  - Read all products / product by ID
  - Update a product
  - Delete a product
- Written in **TypeScript**
- Lightweight and minimal setup

## Tech Stack

- **Deno** (runtime)
- **Hono.js** (web framework)
- **MySQL** (database)
- **TypeScript**

## Prerequisites

Before running this project, make sure you have:

- [Deno](https://deno.land/) installed
- MySQL running and accessible
- A database and `products` table with the following schema:

```sql
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Getting Started

Clone this repository:

```git clone https://github.com/your-username/honojs-crud-example.git
cd honojs-crud-example

```

Configure your database connection in db/client.ts:

```export const client = await new Client().connect({
  hostname: "127.0.0.1",
  username: "root",
  password: "yourpassword",
  db: "your_database_name",
});
```

Run the project with Deno:

```deno run --allow-net --allow-env --allow-read main.ts

```

The server will start at:

```http://localhost:8000

```

## Example Request (Create Product)

```
POST /products
Content-Type: application/json

{
  "name": "Laravel",
  "description": "PHP Framework",
  "price": 0
}
```
