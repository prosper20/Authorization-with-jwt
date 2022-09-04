const router = require('express').Router();
const userController = require('../controllers/userController');

//user login route
router.post('/auth', userController.auth);

//create user account 
router.post('/', userController.register);
/*
//get all users 
router.get('/', userController.fetchAllUsers);

//get a particular user 
router.get('/:id', userController.fetchUserWithId);   */

//update user account
router.put('/:id', userController.updateUserWithId);

//delete user account 
router.delete('/:id', userController.deleteUserWithId);


module.exports = router;