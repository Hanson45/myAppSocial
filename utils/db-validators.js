const prisma = require("../prisma/connection")

const isValidRole = async(role ='')=>{
    const roleExist = await prisma.role.findUnique({
     where: {name: role}
    }) 
    if (! roleExist){
     throw new Error('Role doesnt exist')
    }
}

const isEmailExist = async(email ='') =>{ 
    const exist = await prisma.user.findUnique({ where: {email} })
        if(exist){
            throw new Error('Email registered')
        }
}

const isUserExist = async(id) =>{ 
            id = parseInt(id)    
            const exist = await prisma.user.findUnique({ where: {id} })
                if(!exist){
                    throw new Error('Id doesnt exist')
                }


}


module.exports = {isValidRole, isEmailExist, isUserExist}