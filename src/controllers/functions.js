import { knex } from "../data/db.knex.js";

export const getProduct = async function (product_id) { // ---> this function returns an object of a product
  const res = await knex.select().from("Products").where({ id: product_id }); // ---> returns an array
  return await res[0];
};

export const getCart = async function (cart_id) { // ---> this function returns an object of a cart
  const res = await knex.select().from("Carts").where({ id: cart_id }); // ---> returns an array
  return await res[0];
};
