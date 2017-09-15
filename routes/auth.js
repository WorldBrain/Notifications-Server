const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/login', function(req, res, next) {
  res.render('/login.html')
});
