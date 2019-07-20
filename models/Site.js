var mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");

var imageSchema = new mongoose.Schema(
  {
    altText: String,
    name: String
  }
);

var siteSchema = new mongoose.Schema(
  {
    title: String,
    image: [imageSchema],
  },
  { toObject: { virtuals: true }, toJSON: { virtuals: true } }
);


siteSchema.plugin(mongoosePaginate);

var Site = mongoose.model("Site", siteSchema);

module.exports = Site
