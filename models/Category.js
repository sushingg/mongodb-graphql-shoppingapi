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


var subCategorySchema = new mongoose.Schema(
  {
    slug: { type: String, unique: true },
    title: String,
    product:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
  },
  { timestamps: true}
);

var categorySchema = new mongoose.Schema(
  {
    slug: { type: String, unique: true },
    title: String,
    subCategory:[subCategorySchema]
  },
  { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } }
);

categorySchema.pre("save", function(next) {
  var category = this;
  if (category.isModified("slug")) {
    category.slug = slugify(category.slug, {
      replacement: '-',    // replace spaces with replacement
      remove: null,        // regex to remove characters
      lower: true          // result in lower case
    })
    return next();
  }
});

subCategorySchema.pre("save", function(next) {
  var category = this;
  if (category.isModified("slug")) {
    category.slug = slugify(category.slug, {
      replacement: '-',    // replace spaces with replacement
      remove: null,        // regex to remove characters
      lower: true          // result in lower case
    })
    return next();
  }

});

categorySchema.plugin(mongoosePaginate);
//var Product = mongoose.model("Product", productSchema);

var Category = mongoose.model("Category", categorySchema);

module.exports = Category//,Product;
