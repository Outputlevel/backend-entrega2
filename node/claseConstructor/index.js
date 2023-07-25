const fs = require('fs')

const id = 0
let products = []
let productsFiltered = []


module.exports = class Product {
    constructor (file, title, description, price, thumbnail, code, stock, id ) {
        this.file = file
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
        this.id = products.length + 1
 
    }
    //Create new folder in directory    
    async createFolder(){
        try {
          const folderExist = fs.existsSync('./products'); 
          if(!folderExist){ //Valida si folder existe para finalizar promesa
            await fs.promises.mkdir('./products');
             console.log("New folder added");
            return
          };
          console.log("Folder ya existe en app")
          return
        } catch (err) {
          throw new Error(err);
        };
      };

    //To distribute current objects to class methods *will NOT print in console*. Will also parse JSON  
    async findProducts() {
        try {
            const getArr = await fs.promises.readFile(this.file, "utf-8");
            //console.log(getArr)
            return JSON.parse(getArr); //Parse objects
        } catch (error) {
            console.error(error);
            return [];
        }
    }
    //Method to print current objects in console
    async getProducts() {
        try {
            const getArr = await this.findProducts()
            console.log("Current Products >>>", getArr)
        } catch (error) {
            console.error(error);
            return [];
        }
    }

   async addProduct(title, description, price, thumbnail, code, stock) {
    let product = new Product(title, description, price, thumbnail, code, stock, id)
    const newProduct = {
        title: product.title ?? "No title",
        description: product.description ?? "No description",
        price: product.price ?? "No price",
        code: product.code ?? "No code"
    }
    const products = await this.findProducts()
    products.push(newProduct)
        try {
            await fs.promises.writeFile(this.archivo, JSON.stringify(product, null, "\t"))
            console.log("Usuario creado correctamente!")
            /*products = JSON.parse(getProduct)
            let idFinder = products.find( e => e.code == product.code )
            //valida si el codigo existe previamente
            if(idFinder){ 
                console.log("Codigo ya existente, intente de nuevo")
                return
            } */
            //await fs.promises.writeFile(`./products/data.json`, JSON.stringify(this.title, null, "\t"))     
        } catch (err) {
            console.error(err)
            return []
        }
   }

    async updateProduct(title, description, price, thumbnail, code, stock) {
        let product = new Product(title, description, price, thumbnail, code, stock)
        try {
            const products = await this.findProducts()
            //Encuentra ID para mostrar en consola producto eliminado
            productsFiltered = products.find(p => {
                return p.code === code
            })
            //product.id = productsFiltered.id
            console.log(`Updated:`, product)
            
            //Encuentra productos que no tienen mismo ID, esos se imprimiran, eliminando el primer objeto
            let newArr = products.filter(p => {
                return p.code !== code
            })
            newArr.push(product)
            await fs.promises.writeFile(this.file, JSON.stringify(newArr))
            
        } catch (err) {
            console.error(err)
            return []
        }  
    } 

    async getProductById(id) {
        try {
            const products = await this.findProducts()
            productsFiltered = products.find(p => {
                return p.id === id
            })
            console.log(`Filtered by ID: ${id}`, productsFiltered)
            return productsFiltered 
        } catch (err) {
            console.error(err)
            return []
        }  
    } 

    async deleteProductById(id) {
        try {
            const products = await this.findProducts()
            //Encuentra ID para mostrar en consola producto eliminado
            productsFiltered = products.find(p => {
                return p.id === id
            })
            console.log(`Deleted by ID: ${id}`, productsFiltered)
            //Encuentra productos que no tienen mismo ID, esos se imprimiran, eliminando el primer objeto
            productsFiltered = products.filter(p => {
                return p.id !== id
            })
            await fs.promises.writeFile(this.file, JSON.stringify(productsFiltered))
             
        } catch (err) {
            console.error(err)
            return []
        }  
    } 
 }


 
 // data.createFolder()
