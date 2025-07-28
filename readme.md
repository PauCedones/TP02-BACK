# TP 1 - Backend Coderhouse

## ✨ Descripción

Este proyecto consiste en el desarrollo de un servidor backend utilizando **Node.js** y **Express**, que gestiona productos y carritos de compra a través de rutas REST. La información se guarda en archivos JSON utilizando persistencia en el sistema de archivos.

---

## 📦 Tecnologías utilizadas

- Node.js
- Express
- JavaScript (ESModules)
- File System (fs/promises)

---

## 🚀 Cómo ejecutar el proyecto

1. **Clonar el repositorio**

```bash
git clone https://github.com/PauCedones/TP01-BACK.git
cd TP01-BACK
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Iniciar el servidor**

```bash
node src/app.js
```

El servidor estará disponible en:  
📍 `http://localhost:8080`

---

## 🛒 Endpoints disponibles

### 🔹 Productos - `/api/products`

| Método | Ruta    | Descripción                   |
| ------ | ------- | ----------------------------- |
| GET    | `/`     | Listar todos los productos    |
| GET    | `/:pid` | Obtener un producto por su ID |
| POST   | `/`     | Agregar un nuevo producto     |
| PUT    | `/:pid` | Actualizar un producto por ID |
| DELETE | `/:pid` | Eliminar un producto por ID   |

### 🟦 Ejemplo de body para POST `/api/products`

```json
{
  "title": "Remera Ave",
  "description": "Remera estampada con ave argentina",
  "code": "AVE001",
  "price": 3200,
  "status": true,
  "stock": 15,
  "category": "ropa",
  "thumbnails": ["img/remera1.jpg"]
}
```

---

### 🔹 Carritos - `/api/carts`

| Método | Ruta                 | Descripción                                    |
| ------ | -------------------- | ---------------------------------------------- |
| POST   | `/`                  | Crear un carrito nuevo                         |
| GET    | `/:cid`              | Obtener los productos de un carrito por su ID  |
| POST   | `/:cid/product/:pid` | Agregar un producto al carrito (de uno en uno) |

---

## 📁 Estructura del proyecto

```
├── data/
│   ├── products.json
│   └── carts.json
├── src/
│   ├── app.js
│   ├── routes/
│   │   ├── products.router.js
│   │   └── carts.router.js
│   └── managers/
│       ├── ProductManager.js
│       └── CartManager.js
├── .gitignore
├── package.json
└── README.md
```

---

## ❌ Nota importante

🛑 La carpeta `node_modules` no debe subirse al repositorio.  
Está ignorada mediante el archivo `.gitignore`.

---

## ✅ Requisitos cumplidos

- Servidor Express en puerto 8080
- Rutas de productos y carritos separadas
- Persistencia con archivos `.json`
- Gestión con clases `ProductManager` y `CartManager`

---

## 📬 Autora

Paula Cedones – Curso Backend 1 – Coderhouse
