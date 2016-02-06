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
router.get('/item/:id', function(req, res, next){
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
router.post('/createItem', function(req, res, next){
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

//put-update an item
router.put('/updateItem/:id', function(req, res, next){
  var updateItem = {'name':req.body.name, 'price':req.body.price, 'description':req.body.description};
  var options = {new:true};
  Item.findByIdAndUpdate(req.params.id, function(err, item){
    if(err){
      res.status(500).json(err);
    }
    else{
      res.status(200).json(item);
    }
  });
});

module.exports = router;
