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

router.get('/allmessages', function(req,res,next){
  Messages.find({}, function(err, posts){
    posts.forEach((post)=>{
      post.secret='redacted'
    })
    console.log('new value of posts', posts);
    res.json(posts)
  })
})

//patch example 'cause I always forget


// todo.title = req.body.title || todo.title;
// todo.description = req.body.description || todo.description;
// todo.price = req.body.price || todo.price;
// todo.completed = req.body.completed || todo.completed;
// todo.save((err, todo) => {
//             if (err) {
//                 res.status(500).send(err)
//             }
//             res.status(200).send(todo);
//         });

//useful resource
// https://coursework.vschool.io/mongoose-crud/


router.patch('/editpost/:id', function(req,res,next){
  console.log('inside patch');
  console.log('value of id is ', req.params.id);
  Messages.findById(req.params.id, function(err, message){
    bcryptaspromised.compare(req.body.secret, message['secret'])
			.then(function(result){
          message.title = req.body.message.title || message.title
          message.message = req.body.message.message || message.message
          message.save((err, message) => {
              if (err) {
                console.log('error in saving message!');
                res.json({
                  'status': 'error saving message, secret matched!'
                })
              }
              res.send({'status':'passwordsmatch', 'message': message});
          });

			})
			.catch(bcryptaspromised.MISMATCH_ERROR, function(result){
				  res.send({'status':'passwordsdontmatch'});
			});
  })
})


// Delete example for good measure

// router.delete('/deleteItem/:delete_id',function(req,res,next){
//   console.log("inside delete method");
//
//   Jobs.remove({
//            _id: req.params.delete_id
//        }, function(err, job) {
//            if (err)
//                res.send(err);
//
//            res.json({ message: 'Successfully deleted',
//                       post: job});
//        });
//   });
//



module.exports = router;
