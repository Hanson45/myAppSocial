const {response} = require('express')
const prisma = require( '../prisma/connection')
const bcryptjs = require('bcryptjs')



const getUser = async(req, res = response) => {

    // Obtiene los parametros de consulta de la url, si no existen los inicializa en 0
    // /api/user?skip=5&limit=3
    const { limit = 5, skip = 0 } = req.query;

    
    // Valida que los parametros sean numeros mayores o iguales a 0
    if(isNaN(limit) || skip < 0 || isNaN(limit) || skip < 0) {
        return res.status(400).json({msg: 'Limit and skip parameters must be numbers greater than or equal to 0.'});
    }

    
    const [totalUser, users] = await Promise.all([
        //count of users
        prisma.user.count({where: {state:true}}),
        //validation, filtra los datos requeridos sin importar que mande
        prisma.user.findMany({ 
            where: {state:true},
            take: Number(limit),
            skip: Number(skip),
            select: {
                id: true,
                name: true,
                email: true,
                password: false,
                google: true,
                state: true,
                role: { select: { name: true } }
              }
        })

    ])
    
    res.json({totalUser, users})
}

const postUser = async(req, res = response) => {

    

    const {name, email, password, google, state, role_id, role} = req.body

    //email Validation (express-validator)
  
    

    //hashPass
    const salt = bcryptjs.genSaltSync();
    const hashedPassword = bcryptjs.hashSync(password, salt)


    const result = await prisma.user.create({
            where: {state:true}, //esto es para que regrese los users activos
            data: {
                 name, 
                 email, 
                 password: hashedPassword, 
                 google, 
                 state, 
                 role: {
                    connect: {
                      name: role
                    }
            }
        }
        })
        res.json(result)
        
    }

const putUser = async(req, res = response) => {
    const {id} = req.params
   
    const { id:userId, password, google,role, ...resto} = req.body

    if(password) {
        const salt = bcryptjs.genSaltSync();
        const hashedPassword = bcryptjs.hashSync(password, salt)
    }

    const result = await prisma.user.update({
        where: {id: parseInt(id)},
        data: {
            ...resto, // Actualización de otros campos
            role: { connect: { name: role } } // Actualización del campo role
          }
        
    })

    res.json(result)
};


const deleteUser = async (req, res = response) => {
    const {id} =req.params;

     /*     PARA DESACTIVAR STATE */
    const result = await prisma.user.update({
        where: {id: Number(id)},
        data: { state:false}  
    })

    /* PARA ELIMINAR DEFINITIVAMENTE
    const result = await prisma.user.delete({
        where: {id: Number(id)}, 
        
    }); */

    
    res.json('Deleted')
}   

module.exports = { getUser, putUser, postUser, deleteUser }    