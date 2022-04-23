import { knex } from "../data/db.knex.js";

export const setTables = async function () {
  try {
    const existing = await knex.schema.hasTable("Carts");
    if (!existing) {
      await knex.schema.createTable("Carts", (tbl) => {
        tbl.increments("id").primary().notNullable(),
          tbl.string("timestamp", 100).notNullable();
      });

      await knex.schema.createTable("Products", (tbl) => {
        tbl.increments("id").primary().notNullable(),
          tbl.string("timestamp", 100).notNullable(),
          tbl.string("nombre", 100).notNullable(),
          tbl.string("descripcion", 100).notNullable(),
          tbl.string("codigo", 100).notNullable(),
          tbl.string("foto", 100).notNullable(),
          tbl.integer("precio").notNullable(),
          tbl.integer("stock").notNullable();
      });
      await knex.schema.createTable("In_cart", (tbl) => {
        tbl.increments("id").primary().notNullable(),
          tbl.integer("cart_id").notNullable(),
          tbl.foreign("cart_id").references("Carts.id"),
          tbl.integer("product_id").notNullable(),
          tbl.foreign("product_id").references("Products.id");
      });
      console.log("Created");
    } else {
      console.log("Tables has been already created");
    }
  } catch (error) {
  } finally {
    knex.destroy();
  }
};
