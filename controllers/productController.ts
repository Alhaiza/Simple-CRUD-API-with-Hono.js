import type { context } from "../deps.ts";
import { client } from "../config/db.ts"; // pakai instance, bukan Client class

// Get All Data
export const getAllProducts = async (c: context) => {
  try {
    const rows = await client.query("SELECT * FROM products");
    return c.json(rows, 200);
  } catch (error) {
    console.error("DB Error:", error);
    return c.json({ message: "Internal Server Error" }, 500);
  }
};

// Get Data By ID
export const getProductById = async (c: context) => {
  try {
    const id = c.req.param("id");

    const rows = await client.query("SELECT * FROM products where id = ?", [
      id,
    ]);

    if (rows.length === 0) {
      return c.json({ message: "Product Not Found!" }, 404);
    }
    return c.json({ message: "Product Found!", data: rows[0] }, 200);
  } catch (error) {
    console.error("DB Error:", error);
    return c.json({ message: "Internal Server Error" }, 500);
  }
};

// Create Data
export const createProduct = async (c: context) => {
  try {
    const body = await c.req.json();
    const { name, description, price } = body;

    if (!name || price === undefined || description === undefined) {
      return c.json(
        { message: "Name, Description, and Price are required", data: body },
        400
      );
    }

    console.log("Inserting:", { name, description, price });

    const result = await client.execute(
      "INSERT INTO products (name, description, price, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())",
      [name, description, price]
    );

    return c.json(
      {
        message: "Product Created",
        productId: result.lastInsertId,
        data: body,
      },
      201
    );
  } catch (error) {
    console.error("DB Error:", error);
    return c.json({ message: "Internal Server Error" }, 500);
  }
};

// Update Data
export const updateProduct = async (c: context) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const { name, description, price } = body;

    if (!name || !description || !price === undefined) {
      return c.json(
        {
          message: "You Must Include All Data",
          data: body,
        },
        400
      );
    }

    const existing = await client.query("SELECT * FROM products WHERE id = ?", [
      id,
    ]);

    if (existing.length === 0) {
      return c.json({ message: "Product not found!" }, 404);
    }

    const fields = [];
    const values = [];

    if (name) {
      fields.push("name = ?");
      values.push(name);
    }

    if (description) {
      fields.push("description = ?");
      values.push(description);
    }

    if (price) {
      fields.push("price = ?");
      values.push(price);
    }

    values.push(id);

    await client.execute(
      `UPDATE products SET ${fields.join(", ")} WHERE id = ?`,
      values
    );

    const updated = await client.query("SELECT * FROM products WHERE id = ?", [
      id,
    ]);

    return c.json(
      {
        message: "Product Updated",
        product: updated[0],
      },
      200
    );
  } catch (error) {
    console.error("DB Error:", error);
    return c.json({ message: "Internal Server Error" }, 500);
  }
};

// Delete Data
export const deleteProduct = async (c: context) => {
  try {
    const id = c.req.param("id");

    const existing = await client.query("SELECT * FROM products WHERE id = ?", [
      id,
    ]);

    if (existing.length === 0) {
      return c.json(
        {
          message: "Product Not Found!",
        },
        404
      );
    }

    await client.execute("DELETE FROM products WHERE id = ?", [id]);
    return c.json({
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    console.error("DB Error:", error);
    return c.json({ message: "Internal Server Error" }, 500);
  }
};
