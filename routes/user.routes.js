const {Router} = require('express');
const { getUser, putUser, postUser, deleteUser } = require('../controllers/user.controller');
const { check } = require('express-validator');
const { fieldsValidation } = require('../middlewares/fields.validation');
const { isValidRole, isEmailExist, isUserExist } = require('../utils/db-validators');


const router = Router();

    router.get('/', getUser);        
    router.put('/:id',[
        check('id', 'is not a ID validate').isInt({min: 1}),
        check('id').custom(isUserExist),
        //check-role obliga a mandar un role
        check('role').custom(isValidRole),   
        fieldsValidation 
    ], putUser);    
    
    //path + express validator + controller
    router.post('/', [
        check('name', 'the name is require').not().isEmpty(),
        check('password', 'at least 6 characters required').isLength({min: 6}),
        check('email', 'email is not correct').isEmail(),
        check('email').custom(isEmailExist),
        check('role').custom(isValidRole),
        fieldsValidation
    ] , postUser);

    router.delete('/:id',[
        check('id', 'is not a ID validate').isInt({min: 1}),
        check('id').custom(isUserExist),
        fieldsValidation 
    ], deleteUser); 

module.exports = router