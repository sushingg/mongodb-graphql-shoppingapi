var bcrypt = require("bcrypt-nodejs");
var crypto = require("crypto");
var mongoose = require("mongoose");
var _ = require("lodash");
var mongoosePaginate = require("mongoose-paginate");
var slugify = require('slugify')

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

var Category = mongoose.model("Category", categorySchema);

module.exports = Category
