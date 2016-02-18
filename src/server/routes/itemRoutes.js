var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Item = mongoose.model('items');

//get all items
router.get('/items', function(req, res, next){
  Item.find(function(err, items){
    if(err){
      res.status(500).json(err);
    }
    else{
      res.status(200).json(items);
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

//post- create an item
router.post('/create', function(req, res, next){
  var newItem = new Item(req.body);
  newItem.save(function(err, item){
    if(err){
      res.status(500).json(err);
    }
    else{
      res.status(200).json(item);
    }
  });
});

//put-update streak for an item
router.put('/updateStreak/:id', function(req, res, next){
  console.log(req.body);
  var updateItem = {'lastDay':req.body.lastDay, 'streak':req.body.streak};
  var options = {new:true};
  Item.findByIdAndUpdate(req.params.id, updateItem, options, function(err, item){
    console.log('HELLO??', err, item);
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
