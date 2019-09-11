const User = require("../models/User");

async function updateExpiredProducts() {
  try {
    var cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 5);
    console.log(cutoff);
    User.find({ "order.createdAt": { $lt: cutoff }, "order.status": "wait" })
      .exec()
      .then(function(results){
        return results.map(function(userOrder){
    
          userOrder.order.forEach(function(order){
             // Check if this comment contains banned phrases
             if(order.status === 'wait') {
              order.status = 'cancel';
             }
           });
           return userOrder.save();
        });
      })

    } catch (err) {
      console.log('err' + err);
      //res.status(500).send(err);
    }
  }
module.exports = updateExpiredProducts;
