var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var deepPopulate = require("mongoose-deep-populate")(mongoose);
var Item = mongoose.model('items');
var User = mongoose.model('users');


//get all items from user
router.get('/items/:id', function(req, res, next){
  User.findById(req.params.id, function(err, data){})
  .deepPopulate('items')
  .exec(function(err, data){
    console.log('err ', err, 'data ', data);
    if(err){
      res.status(500).json(err);
    }
    else{
      res.status(200).json(data);
    }
  });
});

//get one item
router.get('/get/:id', function(req, res, next){
  Item.findById(req.params.id, function(err, item){
    if(err){
      res.status(500).json(err);
    }
    else{
      res.status(200).json(item);
    }
  });
});


//post- create an item, save to user
router.post('/create', function(req, res, next){
  var newItem = new Item(req.body.newItem);
  newItem.save(function(err, item){
    if(err){
      res.status(500).json(err);
    }
    else{
      var options = {new:true};
      var update = {$push:{items : newItem}};
      User.findByIdAndUpdate(req.body.id, update, options)
      .exec(function(err, data){
        if(err){
          res.status(500).json(err);
        }
        else{
          res.status(200).json(data);
        }
      });
    }
  });
});


//put-update streak for an item
router.put('/updateStreak/:id', function(req, res, next){
  var updateItem = {'lastDay':req.body.lastDay, 'streak':req.body.streak};
  var options = {new:true};
  Item.findByIdAndUpdate(req.params.id, updateItem, options, function(err, item){
    if(err){
      res.status(500).json(err);
    }
    else{
      res.status(200).json(item);
    }
  });
});


//put-reset streak for an item
router.put('/resetStreak/:id', function(req, res, next){
  var updateItem = {'streak':0};
  var options = {new:true};
  Item.findByIdAndUpdate(req.params.id, updateItem, options, function(err, item){
    if(err){
      res.status(500).json(err);
    }
    else{
      res.status(200).json(item);
    }
  });
});

//delete an item
router.delete('/delete/:id', function(req, res, next){
  Item.findByIdAndRemove(req.params.id, function(err, item){
    if(err){
      res.status(500).json(err);
    }
    else{
      res.status(200).json(item);
    }
  });
});


module.exports = router;
