const express=require('express');
const {get,updateUser} = require('../controller/user.controller')
const verifyToken = require('../utils/verifyUser');

const router = express.Router();

router.get('/',get);
router.post('/update/:id',verifyToken,updateUser);

module.exports=router;