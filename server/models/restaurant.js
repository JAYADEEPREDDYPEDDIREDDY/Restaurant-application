const mongoose = require('mongoose');

const Menu =  new mongoose.Schema(
    {
        name:String,
        description :String,
        type:String,
        image:String,
        price:String,
        quantity:Number,
        ID:String,
    }
)

const restaurant = new mongoose.Schema({
    name:String,
    veg:String,
    nonVeg:String,
    id:String,
    image:String,
    menu: [Menu],
  
});

const Restaurant = mongoose.model('restaurant', restaurant);

module.exports = Restaurant;
