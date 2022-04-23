import express from "express";
import { cart } from "../controllers/carts.js";
import { product } from '../controllers/products.js'

const dataApi = express.Router();

/**
 *  GET methods
 */
dataApi.get("/productos/", async (req, res) => {
  res.status(200).json(await product.getAll())
});
dataApi.get("/productos/:id", async (req, res) => {
  const { id } = req.params;
  res.status(200).json(await product.getProductById(id));
});
dataApi.get("/carrito/:id/productos", async (req, res) => {
  const { id } = req.params;
  res.status(200).json(await cart.getCartProducts(id));
});
/**
 *  POST methods
 */
dataApi.post("/productos", async (req, res) => {
  await product.setProduct(req.body);
  res.status(200).send("producto agregado");
});
dataApi.post("/carrito", async (req, res) => {
  const newCart = await cart.setCart();
  res.status(200).send('carrito creado');
});
dataApi.post("/carrito/:cart_id/productos/:product_id", async (req, res) => {
  const { cart_id, product_id } = req.params;
  await cart.setCartProducts(cart_id, product_id)
  res.status(200).json(await cart.getCartProducts(cart_id));
});
/**
 *  PUT methods
 */
dataApi.put("/productos/:id", async (req, res) => {
  const { id } = req.params;
  const updated = await product.updateProduct(req.body, id);
  res.status(200).json(await product.getProductById(id));
});
/**
 *  DELETE methods
 */
dataApi.delete("/productos/:id", async (req, res) => {
  const { id } = req.params;
  await product.deleteProduct(id)
  res.status(200).send('Producto eliminado');
});
dataApi.delete("/carrito/:id", async (req, res) => {
  const { id } = req.params;
  const deleted = await cart.deleteCart(id);
  res.status(200).json(deleted);
});
dataApi.delete("/carrito/:id/productos/:product_id", async (req, res) => {
  const { id, product_id } = req.params;
  const removed = await cart.deleteCartProduct(id, product_id)
  res.status(200).json(removed)
});

export default dataApi;
