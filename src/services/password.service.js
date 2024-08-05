
const bcrypt=require('bcrypt')
const Salt_Rounds=10


//crear el hash de password
 const hashPassword=async(password)=>{
    
    return await bcrypt.hash(password,Salt_Rounds)

}

//leer y comparar con el hash de la base de datos

 const comparaPassword=async(password,passwordHash)=>{

    return await bcrypt.compare(password,passwordHash)
}

module.exports={hashPassword,comparaPassword}