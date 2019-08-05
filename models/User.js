var bcrypt = require("bcrypt-nodejs");
var crypto = require("crypto");
var mongoose = require("mongoose");
var _ = require("lodash");
var mongoosePaginate = require("mongoose-paginate");

var addressSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    addr: String,
    distric: String,
    province: String,
    postcode: String,
    mobileNumber:String
  },
  { timestamps: true }
);

var orderProductSchema = new mongoose.Schema(
  {
    slug: String,
    title: String,
    price: Number,
    options: String,
    quantity: Number,
    product:{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }
  },
  { timestamps: true }
);

var orderSchema = new mongoose.Schema(
  {
    paymentId: String,
    total: Number,
    name: String,
    status: { type: String, default: "wait" },
    address: addressSchema,
    orderProduct: [orderProductSchema],
  },
  { timestamps: true }
);

var userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true },
    isEmailVerified: Boolean,

    password: String,
    passwordResetToken: String,
    passwordResetExpires: Date,

    mobileNumber: { type: String, unique: true },


    name: { type: String, default: "" },
    gender: { type: String, default: "" },
    dob: { type: Date },
    type: { type: String, default: "user" },

    address: [addressSchema],
    order: [orderSchema]
  },
  { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } }
);

/**
 * Password hash middleware.
 */
userSchema.pre("save", function(next) {
  var user = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

userSchema.plugin(mongoosePaginate);
mongoosePaginate.paginate.options = { 
  limit: 20
};
var User = mongoose.model("User", userSchema);

module.exports = User;
