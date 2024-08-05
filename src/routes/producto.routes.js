const express=require('express')
const router=express.Router()
const Producto=require('../models/producto.model')



//Middleware(para tomar un solo libro)_________________________________

const getProduct=async(req,res,next)=>{
    let producto;
    
    const {id}=req.params
  
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        return res.status(404).json(
            {message:"El ID del prodcuto no es válido"}
        )
    }

    try{

        producto=await Producto.findById(id)
      
       
        if(!producto){
            return res.status(404).json({message:"El producto no fue encontrado"})
        }
    }
    catch(error){
        return res.status(500).json({message:error.message})
    }

    res.producto=producto// agrega el book a la respuesta para luego en las peticiones poderlo rescatar
  
    next()
}


//Obtener todos los productos_________________________________
router.get('/',async (req,res)=>{

    try{
        const productos=await Producto.find()
       
        if(productos.length===0){
          return res.status(204).json([])
        }
        res.json(productos)
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
})


//Crear un nuevo producto(recurso)____________________________________
router.post('/',async(req,res)=>{
    const {title,price, description, category, image, rating}=req?.body
  
    if(!title,!price,!description,!category,!image,!rating){
        return res.status(400).json({message:"Los campos titulo, descripcion, categoria,imagen y rating son obligatorios"})
    }
    const producto=new Producto(
        {
            title,
            price,
            description,
            category,
            image,
            rating
        }
    )
  
    try{
    const newProduct=await producto.save()
      res.status(201).json(newProduct)
    }
    catch(error){
        res.status(400).json({message:error.message})
    }

})

//__________________Get por Id, get individual
router.get('/:id',getProduct,(req,res)=>{
  

    res.json(res.producto)
})


//______________Put___________________________________
router.put('/:id',getProduct,async (req,res)=>{
    try{
    const producto=res.producto
   
    producto.title=req.body.title || producto.title
    producto.price=req.body.price || producto.price
    producto.description=req.body.description || producto.description
    producto.category=req.body.category || producto.category
    producto.image=req.body.image|| producto.image
    producto.rating=req.body.rating|| producto.rating


        
    const updateProduct=await producto.save()
    res.json(updateProduct)
    }
    catch(error){
        res.status(400).json({message:error.message})
    }
})

//____________patch_________________________________

router.patch ('/:id',getProduct,async (req,res)=>{
       

    if(!req.body.title && !req.body.price && !req.body.description && !req.body.category && !req.body.image && !req.body.rating  ){
        res.status(400).json({message:"al menos debe mandar información de alguno de los campos"}) 
    }

 

    try{
    const producto=res.producto


    
    producto.title=req.body.title || producto.title
    producto.price=req.body.price || producto.price
    producto.description=req.body.description || producto.description
    producto.category=req.body.category || producto.category
    producto.image=req.body.image|| producto.image
    producto.rating=req.body.rating|| producto.rating
 
    const updateProducto=await producto.save()
    res.json(updateProducto)
    }
    catch(error){
        res.status(400).json({message:error.message})
    }
})


//_______________delete_______________________

router.delete('/:id',getProduct,async (req,res)=>{

    try{
        const producto=res.producto
        
        await producto.deleteOne(
            {
                _id:producto._id
            }
        );
        res.json({
            message:`El libro ${producto.title} ha sido borrado`
        })
    }
    catch(error){
        res.status(500).json({message:error.message})
    }

})


module.exports = router;