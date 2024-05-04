const express=require('express');
const {get,updateUser,deleteUser} = require('../controller/user.controller')
const verifyToken = require('../utils/verifyUser');

const router = express.Router();

router.get('/',get);
router.post('/update/:id',verifyToken,updateUser);
router.post('/delete/:id',verifyToken,deleteUser);

module.exports=router;