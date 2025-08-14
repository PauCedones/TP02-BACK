// src/app.js
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import path from "path";
import { fileURLToPath } from "url";

import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import ProductManager from "./managers/ProductManager.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// raíz del proyecto (un nivel arriba de /src)
const rootDir = path.join(__dirname, "..");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

// Persistencia por archivo en la raíz
const productManager = new ProductManager(path.join(rootDir, "products.json"));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(rootDir, "public")));

// Handlebars
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", path.join(rootDir, "views"));

// Rutas API
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

// Home
app.get("/", async (req, res) => {
  const products = await productManager.getProducts();
  res.render("realTimeProducts", {
    products,
    title: "Productos en tiempo real",
  });
});

// Vista realtime
app.get("/realtimeproducts", async (req, res) => {
  const products = await productManager.getProducts();
  res.render("realTimeProducts", { products, title: "Realtime" });
});

// ----- SOCKETS -----
io.on("connection", async (socket) => {
  console.log("Cliente conectado:", socket.id);

  // Lista inicial
  socket.emit("updateProducts", await productManager.getProducts());

  // Alta
  socket.on("newProduct", async (product) => {
    try {
      await productManager.addProduct(product);
      io.emit("updateProducts", await productManager.getProducts());
    } catch (err) {
      console.error("Error add:", err);
      socket.emit("errorMessage", "No se pudo agregar el producto");
    }
  });

  // Baja
  socket.on("deleteProduct", async ({ id }) => {
    try {
      await productManager.deleteProduct(id);
      io.emit("updateProducts", await productManager.getProducts());
    } catch (err) {
      console.error("Error delete:", err);
      socket.emit("errorMessage", "No se pudo eliminar el producto");
    }
  });
});

const PORT = process.env.PORT || 8080;

httpServer.listen(PORT, () => {
  console.log(`Servidor listo en http://localhost:${PORT}`);
});
