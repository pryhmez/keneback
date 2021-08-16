const { check } = require('express-validator');

const signUpValidation = [
  check('firstname', 'Please inut your first name').not().isEmpty(),
	check('lastname', 'Please inut your last  name').not().isEmpty(),  
	check('email', 'Please include a valid email').isEmail(),
	check('password', 'Please enter a password with 8 or more characters').isLength({ min: 8 }),
//   check('phone', 'Please enter a valid phone number').custom((value) => (/^0[7-9][0-1]\d{8}$/g).test(value))  
];
const loginValidation = [
	check('email', 'Please include a valid email').isEmail(),
	check('password', 'Password length must  be up to 8 characters').isLength({ min: 8 }),
]
module.exports = { signUpValidation, loginValidation};
