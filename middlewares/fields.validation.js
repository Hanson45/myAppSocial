const { validationResult } = require('express-validator')

/* middleware para validar campos, en el validationResult tendremos todos los errores del express validation
   por lo que en caso de haber retornara el status 400, sino se invoca el metodo next que esta de 3er argumento
   y seguira con la ejecucion del controlador 
*/
const fieldsValidation = (req, res, next)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors)
    }

    next();
}

module.exports = {fieldsValidation}