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


categorySchema.plugin(mongoosePaginate);
//var Product = mongoose.model("Product", productSchema);

var Category = mongoose.model("Category", categorySchema);

module.exports = Category//,Product;
