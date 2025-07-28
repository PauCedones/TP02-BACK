import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";

const router = Router();
const productManager = new ProductManager("./products.json");

router.get("/", async (req, res) => {
  const products = await productManager.getProducts();
  res.json(products);
});

router.get("/:pid", async (req, res) => {
  const product = await productManager.getProductById(req.params.pid);
  product
    ? res.json(product)
    : res.status(404).json({ error: "Producto no encontrado" });
});

router.post("/", async (req, res) => {
  const result = await productManager.addProduct(req.body);
  res.status(201).json(result);
});

router.put("/:pid", async (req, res) => {
  const result = await productManager.updateProduct(req.params.pid, req.body);
  res.json(result);
});

router.delete("/:pid", async (req, res) => {
  await productManager.deleteProduct(req.params.pid);
  res.status(204).send();
});

export default router;
