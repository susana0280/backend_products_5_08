
const User=require('../models/user.model')
const generateToken=require('../services/auth.service')
const {hashPassword,comparaPassword}=require('../services/password.service')

//________________registro usuario__________________________
 const register=async (req,res)=>{

    const {email,password}=req.body
   
    try{
       

        if(!email){
            res.status(400).json({message:"el email es obligatorio"})
        }
        if(!password){
            res.status(400).json({message:"el password es obligatorio"})
        }

        const hashedPassword=await hashPassword(password)
      
        const user=new User(
            {
                email,
                password:hashedPassword
            }
        )
        const newUser=await user.save()

        const token=generateToken(newUser)
        res.status(201).json(token)
    }
    catch(err){

        console.log(err)
        res.status(400).json({message:err.message})
       
    }
}

//_______________________login usuario_______________________

 const login=async (req,res)=>{ 

    let {email,password}=req.body

    try{

        
        if(!password) throw new Error('El password es obligatorio')
        if(!email) throw new Error('El email es obligatorio')

        const user=await User.findOne({ email :email })
      
        if(!user){
            res.status(404).json({error:"usuario no encontrado"})
            return
        }

        const passwordMatch=await comparaPassword(password,user.password) 
        
            if(!passwordMatch){
                
                res.status(401).json({error:"el usuario y contraseña no coinciden"})//20º
               
            }

            const token=generateToken(user)
            res.status(200).json({token})
        }
    catch(error){

        console.log("Error",error)
    }


}




module.exports={register,login}