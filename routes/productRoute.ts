import { Hono } from "../deps.ts";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers/productController.ts";

const productRoutes = new Hono();

// Routes untuk Product
// Mirip Laravel, ada GET POST PUT DELETE, Habis Endpoint baru nama fungsi nya

productRoutes.get("/", getAllProducts);
productRoutes.get("/:id", getProductById);
productRoutes.post("/", createProduct);
productRoutes.put("/:id", updateProduct);
productRoutes.delete("/:id", deleteProduct);

export default productRoutes;
