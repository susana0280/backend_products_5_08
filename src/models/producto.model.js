const mongoose=require('mongoose') 

const productoSchema=new mongoose.Schema(

    {
        
        title: String,
        price: Number,
        description: String,
        category: String,
        image: String,
        rating: {
        rate: Number,
        count: Number
        }
    }


)

module.exports = mongoose.model('Producto', productoSchema)

   


