import fs from "fs";

export class Data {
  constructor() {
    this.dir = "./src/db/products.json";
    this.product = {  
      id: null,
      timestamp: new Date(),
      nombre: null,
      descripcion: null,
      código: null,
      foto: null,
      precio: null,
      stock: null
    }
    this.messages = {
      error: "no data founded",
      updated: "product updated",
    };
  }
  writeDb(ObjArr) {
    fs.writeFileSync(this.dir, JSON.stringify(ObjArr));
  }
  addId(ObjArr) {
    let id = 1;
    ObjArr.map((prod) => {
      if ((prod.id = id)) {
        id = prod.id + 1;
      }
    });
    return id;
  }
  getContent() {
    try {
      const dbContent = fs.readFileSync(this.dir, "utf-8");
      return JSON.parse(dbContent);
    } catch (e) {
      return this.messages.error;
    }
  }
  getProductById(id) {
    try {
      const dbContent = this.getContent();
      const foundData = dbContent.filter((product) => {
        if (product.id === id) {
          return product;
        }
      });
      if (foundData.length == 0) {
        return console.log(this.messages.error);
      } else {
        return foundData[0];
      }
    } catch (e) {
      return console.log(e);
    }
  }
  setProduct(Obj) {
    let arr = [];
    Object.assign(this.product, Obj)
    try {     
      const dbContent = this.getContent();
      arr = dbContent;
      this.product.id = this.addId(arr);
      arr.push(this.product);
      this.writeDb(arr);
    } catch (e) {
      this.product.id = 1;
      arr = [this.product];
      this.writeDb(arr);
    }
  }
  updateProduct(id, Obj) {
    try {
      const dbContent = this.getContent();
      const productFounded = dbContent.find((product) => product.id === id);
      const index = dbContent.indexOf(productFounded);
      if (id > index + 1) {
        return this.messages.error;
      } else {
        Obj.id = id;
        dbContent[index] = Obj;
        this.writeDb(dbContent);
        return this.messages.updated;
      }
    } catch (e) {
      return e;
    }
  }
  deleteProduct(id) {
    let newId = 1;
    try {
      const dbContent = this.getContent();
      const productFounded = dbContent.filter((product) => product.id === id);
      const index = dbContent.indexOf(productFounded);
      if (productFounded.length === 1) {
        dbContent.splice(index, 1);
        dbContent.forEach((product) => (product.id = newId++));
        this.writeDb(dbContent);
        return this.messages.updated;
      } else {
        return this.messages.error;
      }
    } catch (e) {
      return this.messages.error;
    }
  }
}

export const dataController = new Data();
export const getProducts = dataController.getContent();
