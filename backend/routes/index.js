var express = require('express');
var router = express.Router();
var Messages = require('../models/messagesSchema');

var bcryptaspromised = require('bcrypt-as-promised');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/newmessage', function(req,res,next){
  bcryptaspromised.hash(req.body.secret, 10)
    .then(function(hash,err){
      if(err){
        res.json({
          'status': 'error',
          'where': 'in hashing message'
        })
      }else{
        var newMessage = new Messages({
          	secret: hash,
          	title: req.body.title,
            message: req.body.message
      	});
        newMessage.save(function(err, post){
          if(err){
            res.json({
              'status': 'error',
              'where': 'in saving message'
            })
          }else{
      		  res.json({
      				'status': 'message_posted',
      				'huzzah': 'GETSOME'
      			});
          }
        });
      }
    });
});


module.exports = router;
