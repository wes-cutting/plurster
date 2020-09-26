const express = require('express');
const router = express.Router();

const mongoose = require('../data/mongoose');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test', async function(req, res, next) {
  try{
    const data = await mongoose.test();
    res.send(data);
  } catch (err) {
    res.status(500).send(err);
  }
})

module.exports = router;
