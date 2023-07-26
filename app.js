console.log("--------------Manager De Productos---------------")
const Product = require('./node/claseConstructor/index.js')

const data = new Product() 

//-------Descomentar comandos para hacer pruebas------------------

//data.findProducts()
//data.addProduct("Subaru", "Camioneta", "34000", "code1", 10)  //codigo repetido checar para validacion
//data.addProduct("Honda", "Sedan", "26000", "code5", 4)
//data.addProduct("Ford", "Camioneta", "44000", "code6", 6)
//data.getProducts() 
//data.getProductById(1)
//data.updateProduct("Ford","auto no de lujo", "14000", "code2", "0146")
//data.deleteProductById(2)
//data.deleteAll()