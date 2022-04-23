import { knex } from "../data/db.knex.js";

const date = new Date();

class Products {
  constructor() {
    this.product = {
      timestamp: `[${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]`,
      nombre: null,
      descripcion: null,
      codigo: null,
      foto: null,
      precio: null,
      stock: null,
    };
  }
  //----------CREATE------------//
  async setProduct(product) {
    try {
      Object.assign(this.product, product);
      return await knex.insert(this.product).from("Products");
    } catch (error) {
      console.error(error);
    } 
    // finally {
    //   knex.destroy();
    // }
  }
  //-----------READ-------------//
  async getAll() {
    try {
      return await knex.select().from("Products");
    } catch (error) {
      console.log(error);
    } 
    // finally {
    //   knex.destroy();
    // }
  }
  async getProductById(product_id) {
    try {
      const product = await knex.select().from("Products").where({ id: product_id });
      return product[0]
    } catch (error) {
      console.error(error);
    } 
    // finally {
    //   knex.destroy();
    // }
  }
  //-----------UPDATE------------//
  async updateProduct(newContent, id) {
    try {
      return await knex.from("Products").update(newContent).where({ id: id });
    } catch (error) {
      console.error(error);
    } 
    // finally {
    //   knex.destroy();
    // }
  }
  //----------DELETE------------//
  async deleteProduct(product_id) {
    try {
      return await knex.del().from("Products").where({ id: product_id });
    } catch (error) {
      console.error(error);
    } 
    // finally {
    //   knex.destroy();
    // }
  }
}

export const product = new Products();