var bcrypt = require("bcrypt-nodejs");
var crypto = require("crypto");
var mongoose = require("mongoose");
var _ = require("lodash");
var mongoosePaginate = require("mongoose-paginate");

var slugify = require('slugify')
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
    price: { type: Number, default: 0 },
    quantity: { type: Number, default: 0 },
    description: { type: String, default: "" },
    descriptionHtml: { type: String, default: "" },
    published: { type: Boolean, default:false },
    options: String,
    image: [imageSchema],
    category:String,
    subCategory:String

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
mongoosePaginate.paginate.options = { 
  limit: 20
};

var Product = mongoose.model("Product", productSchema);

module.exports = Product,productSchema;
