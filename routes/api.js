const express = require('express');
const router = express.Router();
const path = require('path');
const Notification = require('../model/notifications');


//set the route path and initialize the API
router.get('/notifications',function(req,res,next){
  Notification.find({}).then(function(notifications){
    res.send(notifications);
  })
});

// router.get('/login', function(req,res) {
//   res.sendFile(path.join(__dirname+'/login.html'));
// });
//
// router.get('/login/now', function(req,res) {
//   res.redirect('./client/')
// })
// function getNotifications(req,res,next){
//   Notification.find({}).then(function(notifications){
//     res.send(notifications);
//   })
// );
//
// router.get('/notifications', getNotifications);


router.post('/notifications',function(req,res,next){
  var notification = new Notification();
  notification.title = req.body.title;
  notification.body = req.body.body;
  req.body
  res.json({message:'json added'});
  console.log(req.body, 'req.body'); //"POST"

  Notification.create(req.body).then(function(notification) {
    res.send(notification);
  }).catch();
});

router.put('/notifications/:id',function(req,res,next){
  Notification.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
    Notification.findOne({_id:req.params.id}).then(function(notification){
      console.log(req.body, 'what is happening');
      res.send(notification);
    });
  })
});

router.delete('/notifications/:id',function(req,res,next){
  Notification.findByIdAndRemove({_id:req.params.id}).then(function(notification) {
  res.send(notification);
    });
});

module.exports = router;
