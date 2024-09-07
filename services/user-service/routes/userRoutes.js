const express = require('express');
const {registerUser, loginUser, logoutUser, getUser, updateUser}=require('../controllers/userController');
const authenticate = require('../middleware/authenticate');
const router = express.Router();

router.post('/signup',registerUser);
router.post('/login', loginUser);
router.post('/logout',logoutUser);
router.get('/profile',getUser);
router.put('/profile/update',authenticate,updateUser)


module.exports=router;
