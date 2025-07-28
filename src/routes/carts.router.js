import { Router } from "express";
import CartManager from "../managers/CartManager.js";

const router = Router();
const cartManager = new CartManager("./carts.json");

router.post("/", async (req, res) => {
  const cart = await cartManager.createCart();
  res.status(201).json(cart);
});

router.get("/:cid", async (req, res) => {
  const cart = await cartManager.getCartById(req.params.cid);
  cart
    ? res.json(cart)
    : res.status(404).json({ error: "Carrito no encontrado" });
});

router.post("/:cid/product/:pid", async (req, res) => {
  const result = await cartManager.addProductToCart(
    req.params.cid,
    req.params.pid
  );
  res.status(201).json(result);
});

export default router;
