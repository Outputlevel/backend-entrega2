console.log("Manager De Productos")
const Product = require('./node/claseConstructor/index.js')

const data = new Product("./node/claseConstructor/products/data.json") 

//data.addProduct("Ford", "auto no de lujo", "14000", "code2", "0146")
//data.getProducts() 
//data.getProductById(1)
data.updateProduct("Ford","auto no de lujo", "14000", "code2", "0146")
//data.deleteProductById(2)