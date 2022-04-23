export const config = {
  development: {
    client: "better-sqlite3",
    connection: {
      filename: "./src/data/ecommerce.sqlite",
    },
    useNullAsDefault: true,
  },
};
