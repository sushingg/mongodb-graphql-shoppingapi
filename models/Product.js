var bcrypt = require("bcrypt-nodejs");
var crypto = require("crypto");
var mongoose = require("mongoose");
var _ = require("lodash");
var mongoosePaginate = require("mongoose-paginate");

var imageSchema = new mongoose.Schema(
  {
    altText: String,
    name: String
  }
);

var productSchema = new mongoose.Schema(
  {
    slug: { type: String, unique: true },
    title: String,
    price: Number,
    quantity: Number,
    description: String,
    descriptionHtml: String,
    published: Boolean,
    options: String,
    image: [imageSchema]
  },
  { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } }
);

productSchema.pre("save", function(next) {
  var product = this;
  if (product.isModified("slug")) {
    product.slug = slugify(product.slug, {
      replacement: '-',    // replace spaces with replacement
      remove: null,        // regex to remove characters
      lower: true          // result in lower case
    })
    return next();
  }

});

productSchema.plugin(mongoosePaginate);

var Product = mongoose.model("Product", productSchema);

module.exports = Product,productSchema;
