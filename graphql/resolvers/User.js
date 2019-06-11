const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const option = require("../../config/options");
const moment = require("moment");
const Product = require("../../models/Product");
const includeAccessToken = user => {
  const payload = {
    id: user.id,
    username: user.username,
    exp: Math.floor(Date.now() / 1000) + 60 * 120
  };
  let userObject = user.toJSON();
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);
  userObject["token"] = token;

  return userObject;
};
var omise = require("omise")({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY
});
async function makeCharge(amount,id) {
  amount = amount * 100;
  console.log(amount);
  var currency = "thb";
  var source = {
    type: "internet_banking_bbl",
    amount: amount,
    currency: currency
    
  };
  var result = null;
  await omise.sources
    .create(source)
    .then(function(resSource) {
      return omise.charges.create({
        amount: amount,
        source: resSource.id,
        currency: currency,
        return_uri: "https://sushingg.herokuapp.com",
        metadata:{
            "order_id": id
          }
      });
    })
    .then(function(charge) {
      result = charge;
    })
    .catch(function(err) {
      console.log(err);
      result = err;
    });
  return result;
}
class UserController {
  constructor(model) {
    this.model = User;
  }

  // this will find a single record based on username and return it.
  auth(options) {
    return this.model
      .findOne({ email: options.email })
      .exec()
      .then(user => {
        if (!user) {
          return new Error("Invalid login credentials.");
        }
        if (bcrypt.compareSync(options.password, user.password)) {
          return includeAccessToken(user);
        } else {
          return new Error("Invalid login credentials.");
        }
      })
      .catch(error => {
        return error;
      });
  }

  // this will find all the records in database and return it
  index() {
    return this.model
      .find()
      .populate({ path: "order.orderProduct.product", model: "Product" })
      .sort("createdAt")
      .exec()
      .then(records => {
        return records;
      })
      .catch(error => {
        return error;
      });
  }

  // this will find a single record based on id and return it.
  single(options) {
    return this.model
      .findOne({ _id: options.id })
      .populate({ path: "order.orderProduct.product", model: "Product" })
      .exec()
      .then(record => {
        return record;
      })
      .catch(error => {
        return error;
      });
  }

  // this will insert a new record in database
  create(data) {
    const record = new this.model(data);
    return record
      .save()
      .then(user => {
        var otp = option.generateOtp();

        user.mobileVerificationOTP = otp;
        var todayDate = new Date();
        todayDate.setDate(todayDate.getDate() + 1); // OTP expiry 1 day
        user.mobileVerificationExpires = todayDate;

        var message =
          user.mobileVerificationOTP + " is the OTP for your new account";

        return user
          .save()
          .then(updated => {
            return includeAccessToken(updated);
          })
          .catch(error => {
            return error;
          });
      })
      .catch(error => {
        return error;
      });
  }

  // this will update existing record in database
  update(user, data) {
    return this.model
      .findOne({ _id: user.id })
      .exec()
      .then(record => {
        let mobileNumberModified = false;
        Object.keys(data).map(field => {
          if (field == "mobileNumber" && data[field] != user.mobileNumber) {
            mobileNumberModified = true;
          }

          if (
            field == "picture" &&
            (!data[field] || data[field] == "" || data[field] == null)
          ) {
            data[field] = record.picture;
          }
          record[field] = data[field];
        });

        return record
          .save()
          .then(user => {
            if (mobileNumberModified) {
              // Send OTP if mobileNumber changed
              var otp = option.generateOtp();

              user.mobileVerificationOTP = otp;
              var todayDate = new Date();
              todayDate.setDate(todayDate.getDate() + 1); // OTP expiry 1 day
              user.mobileVerificationExpires = todayDate;

              const message =
                user.mobileVerificationOTP +
                " is the OTP for your mobile number";

              return user
                .save()
                .then(updated => {
                  return updated;
                })
                .catch(error => {
                  return error;
                });
            } else {
              return user;
            }
          })
          .catch(error => {
            return error;
          });
      })
      .catch(error => {
        return error;
      });
  }

  // this will insert a new record in database
  createAddress(user, data) {
    return this.model
      .findById(user.id)
      .exec()
      .then(record => {
        if (!record) {
          return new Error("Invalid request user does't exist.");
        }
        console.log(record);
        const address = record.address.create(data);
        record.address.push(address);

        return record
          .save()
          .then(updated => {
            return address;
          })
          .catch(error => {
            return error;
          });
      })
      .catch(error => {
        return error;
      });
  }

  // this will update existing record in database
  updateAddress(user, data) {
    return this.model
      .findOne({ _id: user.id })
      .exec()
      .then(user => {
        let address = user.address.id(data.id);

        if (!address) throw new Error("Address not found");

        delete data.id;
        Object.keys(data).map(field => {
          address[field] = data[field];
        });

        return user
          .save()
          .then(user => {
            return address;
          })
          .catch(error => {
            return error;
          });
      })
      .catch(error => {
        return error;
      });
  }

  // this will delete the user address
  deleteAddress(user, data) {
    return this.model
      .findOne({ _id: user.id })
      .exec()
      .then(user => {
        user.address.pull(data.id);
        return user
          .save()
          .then(user => {
            return { message: "Address deleted successfully!" };
          })
          .catch(error => {
            return error;
          });
      })
      .catch(error => {
        return error;
      });
  }
  // this will insert a new record in database
  createOrder(user, data) {
    return this.model
      .findById(user.id)
      .populate({ path: "order.orderProduct.product", model: "Product" })
      .exec()
      .then(record => {
        if (!record) {
          return new Error("Invalid request user does't exist.");
        }
        const order = record.order.create(data);
        record.order.push(order);

        return record
          .save()
          .then(updated => {
            return this.model
              .findOne({ "order._id": order._id })
              .populate({
                path: "order.orderProduct.product",
                model: "Product"
              })
              .exec()
              .then(record => {
                return record.order.id(order._id);
              })
              .catch(error => {
                return error;
              });
          })
          .catch(error => {
            return error;
          });
      })
      .catch(error => {
        return error;
      });
  }

  // this will update existing record in database
  updateOrder(data) {
    return this.model
      .findOne({ "order._id": data.id })
      .populate({ path: "order.orderProduct.product", model: "Product" })
      .exec()
      .then(user => {
        let order = user.order.id(data.id);
        if (!order) throw new Error("Order not found");
        //console.log(order)
        return makeCharge(order.total,data.id).then(charge => {
          //console.log(charge.authorize_uri)
          if (!charge.id) throw new Error("Charge not create");
          order["paymentId"] = charge.id;
          //console.log(user)
          return user
            .save()
            .then(user => {
              return { message: charge.authorize_uri };
            })
            .catch(error => {
              return error;
            });
        });
      })
      .catch(error => {
        return error;
      });
  }

  updateCharge(data,res) {
      console.log('got in updatecharge resover')
    return this.model
      .findOneAndUpdate({ 'order.paymentId': data.paymentId }, 
      { "order.$.status" :  data.status },
      {safe: true, new: true})
      .exec()
      .then(user => {
        console.log(user)
        if(!user){
            res.status(401).json({error: 'no user'});
        }else{
            res.status(200).send('ok')
        }
      })
      .catch(error => {
        res.status(401).json({error: error});
        console.log(error)
        return error;
      });
  }
}
const user_controller = new UserController();
module.exports = user_controller;
