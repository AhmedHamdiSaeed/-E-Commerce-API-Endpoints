const { check } = require('express-validator');
const validatMidelware = require('../middleware/validatorMidelware');

const updateCartValidator=[
    check('id').isMongoId().withMessage('Invalid id format'),
    validatMidelware
]

const deleteCartValidator=[
    check('id').isMongoId().withMessage('Invalid id format'),
    validatMidelware
]



module.exports ={updateCartValidator,deleteCartValidator} 
 