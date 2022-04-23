import { getCart, getProduct } from "./functions.js";
import { knex } from "../data/db.knex.js";

class Carts {
  constructor() {
    this.messages = {
      no_id: "No id founded",
      no_cart: "No cart with that id",
      empty_cart: "This cart is empty",
      removed: "Product was removed from the cart",
      deleted: "Thes cart was deleted",
    };
  }
  //----------CREATE------------//
  async setCart() {
    try {
      const date = new Date();
      return await knex
        .insert({
          timestamp: `[${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]`,
        })
        .from("Carts");
    } catch (err) {
      console.error("error: ", err);
    } 
    // finally {
    //   knex.destroy();
    // }
  }
  async setCartProducts(cart_id, product_id) {
    try {
      const aviableCarts = await knex.select().from("Carts");
      if (aviableCarts.length == 0) {
        this.setCart();
        await knex
          .insert({ cart_id: 1, product_id: product_id })
          .from("In_cart");
      } else {
        await knex
          .insert({ cart_id: cart_id, product_id: product_id })
          .from("In_cart");
      }
    } catch (error) {
      return this.messages.no_id;
    } 
    // finally {
    //   knex.destroy();
    // }
  }
  //-----------READ------------//
  async getCartProducts(cart_id) {
    try {
      // this algorithm is used to transform the cart id and the product id when they are vinculated in a JSON cart with an array containing user selected products inside
      let arr = [];
      const reference = await knex
        .select("product_id")
        .from("In_cart")
        .where({ cart_id: cart_id }); // --> returns an array
      for (const product of reference) {
        arr.push(product.product_id);
      }
      let cart = await getCart(cart_id); // ---> Cart that I want to access to show the products inside
      cart.products = [];
      for (const id of arr) {
        let product = await getProduct(id);
        cart.products.push(product);
      }
      if (cart.products.length > 0) {
        return cart;
      } else {
        return cart; // this.messages.empty_cart
      }
    } catch (error) {
      return this.messages.no_cart;
    } 
    // finally {
    //   knex.destroy();
    // }
  }
  //----------DELETE-----------//
  async deleteCartProduct(cart_id, product_id) {
    try {
      await knex
        .del()
        .from("In_cart")
        .where({ cart_id: cart_id, product_id: product_id });
      return this.messages.removed;
    } catch (error) {
      return this.messages.no_id;
    } 
    // finally {
    //   knex.destroy();
    // }
  }
  async deleteCart(cart_id) {
    try {
      await knex.del().from("In_cart").where({ cart_id: cart_id });
      await knex.del().from("Carts").where({ id: cart_id });
      return this.messages.deleted;
    } catch (error) {
      return this.messages.no_cart;
    } 
    // finally {
    //   knex.destroy();
    // }
  }
}

export const cart = new Carts();
