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
    Slug: String,
    Title: String,
    Price: Number,
    Options: String,
    quantity: Number
  },
  { timestamps: true }
);

var orderSchema = new mongoose.Schema(
  {
    PaymentId: String,
    Total: Number,
    Status: String,
    address: [addressSchema],
    Product: [orderProductSchema],
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
    mobileVerificationOTP: String,
    mobileVerificationExpires: Date,
    isMobileVerified: Boolean,

    deviceTokens: [{ fcm: String, platform: String }],

    name: { type: String, default: "" },
    gender: { type: String, default: "" },
    dob: { type: Date },
    picture: { type: String, default: "" },

    status: { type: String, default: "active" },
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

var User = mongoose.model("User", userSchema);

module.exports = User;
