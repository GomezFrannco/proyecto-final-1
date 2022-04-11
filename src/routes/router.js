import express from "express";
import * as DB from "../models/products.js";
import * as CART from "../models/carts.js";

const dataApi = express.Router();

/**
 *  GET methods
 */
dataApi.get("/productos/", (req, res) => {
  res.status(200).json(DB.getProducts);
});
dataApi.get("/productos/:id", (req, res) => {
  const { id } = req.params;
  res.status(200).send(DB.dataController.getProductById(parseInt(id)));
});
dataApi.get("/carrito/:id/productos", (req, res) => {
  const { id } = req.params;
  res.status(200).json(CART.cartController.getCartProducts(parseInt(id)));
});
/**
 *  POST methods
 */
dataApi.post("/productos", (req, res) => {
  DB.dataController.setProduct(req.body);
  res.send("producto agregado");
});
dataApi.post("/carrito", (req, res) => {
  const newCart = CART.cartController.setCart();
  res.status(200).json(newCart);
});
dataApi.post("/carrito/:id/productos/:product_id", (req, res) => {
  const { id, product_id } = req.params;
  const product = DB.dataController.getProductById(parseInt(product_id));
  const cart = CART.cartController.setCartProducts(parseInt(id), product);
  res.status(200).json(cart);
});
/**
 *  PUT methods
 */
dataApi.put("/productos/:id", (req, res) => {
  const { id } = req.params;
  const updated = DB.dataController.updateProduct(parseInt(id), req.body);
  res.send(updated);
});
/**
 *  DELETE methods
 */
dataApi.delete("/productos/:id", (req, res) => {
  const { id } = req.params;
  res.send(DB.dataController.deleteProduct(parseInt(id)));
});
dataApi.delete("/carrito/:id", (req, res) => {
  const { id } = req.params;
  const deleted = CART.cartController.deleteCart(parseInt(id));
  res.status(200).json(deleted);
});
dataApi.delete("/carrito/:id/productos/:product_id", (req, res) => {
  const { id, product_id } = req.params;
  const productDeleted = CART.cartController.deleteCartProducts(
    parseInt(id),
    parseInt(product_id)
  );
  res.status(200).json(productDeleted);
});

export default dataApi;
