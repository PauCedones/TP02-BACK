import fs from "fs/promises";

export default class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async _readFile() {
    try {
      const data = await fs.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  async _writeFile(data) {
    await fs.writeFile(this.path, JSON.stringify(data, null, 2));
  }

  async getProducts() {
    return await this._readFile();
  }

  async getProductById(id) {
    const products = await this._readFile();
    return products.find((p) => p.id == id);
  }

  async addProduct(product) {
    const products = await this._readFile();
    const newProduct = {
      id: Date.now().toString(),
      status: true,
      ...product,
    };
    products.push(newProduct);
    await this._writeFile(products);
    return newProduct;
  }

  async updateProduct(id, updatedFields) {
    const products = await this._readFile();
    const index = products.findIndex((p) => p.id == id);
    if (index === -1) return null;
    delete updatedFields.id;
    products[index] = { ...products[index], ...updatedFields };
    await this._writeFile(products);
    return products[index];
  }

  async deleteProduct(id) {
    let products = await this._readFile();
    products = products.filter((p) => p.id != id);
    await this._writeFile(products);
  }
}
