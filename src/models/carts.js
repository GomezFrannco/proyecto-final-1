import fs from "fs";
import { Data } from "./products.js";

export class Cart extends Data {
  constructor() {
    super();
    this.dir = "./src/db/carts.json"; //"../db/carts.json";
    this.cart = {
      id: null,
      timestamp: new Date(),
      products: [],
    };
    this.messages = {
      error: "no carts founded",
      empty: "no products in cart",
      no_product: "no products to add",
      added: "product succesfully added",
      updated: "cart successfully deleted",
      removed: "product succesfully removed",
    };
  }
  setCart() {
    let arr = [];
    try {
      arr = this.getContent();
      if (arr.length >= 1 || arr.length === 0) {
        this.cart.id = this.addId(arr);
        arr.push(this.cart);
        this.writeDb(arr);
        return this.cart.id;
      }
    } catch (e) {
      this.cart.id = 1;
      arr = [this.cart];
      this.writeDb(arr);
      return this.cart.id;
    }
  }
  deleteCart(id) {
    return this.deleteProduct(id);
  }
  getCartProducts(cartId) {
    try {
      const cart = this.getProductById(cartId);
      if (cart.products.length > 0) {
        return cart.products;
      } else {
        return this.messages.empty;
      }
    } catch (e) {
      return this.messages.error;
    }
  }
  setCartProducts(cartId, product) {
    let arr = [];
    try {
      const dbContent = this.getContent(); // leemos toda la info db
      const cart = this.getProductById(cartId); // traemos un carrito con su id
      arr = cart.products; // convertimos el array en los productos dentro del carrito
      if (product != null) {
        arr.push(product); // añadimos el producto seleccionado en el carrito
        const cartFounded = dbContent.filter((cart) => {
          // recorremos el contenido de la db
          if (cart.id === cartId) {
            // aquel carrito que coincida con el id del parametro
            cart.products = arr; // ahora los productos de ese carrito son los que previamente se agregaron en arr
            this.writeDb(dbContent);
          }
        });
        return this.messages.added;
      } else {
        return this.messages.no_product;
      }
    } catch (error) {
      return this.messages.error;
    }
  }
  deleteCartProducts(cartId, productId) {
    let arr = [];
    try {
      const dbContent = this.getContent();
      const cartContent = this.getProductById(cartId);
      arr = cartContent.products;
      const productFounded = arr.find((product) => product.id == productId);
      const index = arr.indexOf(productFounded);
      if (index >= 0 && productId != null) {
        arr.splice(index, 1);
        const cartFounded = dbContent.filter((cart) => {
          if (cart.id == cartId) {
            cart.products = arr;
            this.writeDb(dbContent);
          }
        });
        return this.messages.removed;
      } else {
        return this.messages.error;
      }
    } catch (e) {
      return this.messages.error;
    }
  }
}

export const cartController = new Cart();
