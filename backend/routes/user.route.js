const express=require('express');
const {get} = require('../controller/user.controller')

const router = express.Router();

router.get('/',get);

module.exports=router;