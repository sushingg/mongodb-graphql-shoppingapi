const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const Product = require("../../models/Product");
const option = require("../../config/options");
const moment = require("moment");
const Category = require("../../models/Category");
var mongoose = require("mongoose");

class ProductController {
  constructor(model) {
    this.model = Product;
  }

  // this will find all the records in database and return it
  index() {
    return this.model
      .find()
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
    const product = new Product(data.product);
    console.log(product);
    return Category.findOneAndUpdate(
      { "subCategory._id": data.subcatId },
      { $push: { "subCategory.$.product": [{ _id: product._id }] } }
    )
      .exec()
      .then(record => {
        console.log("category");
        console.log(record);
        return product
          .save()
          .then(record => {
            console.log(record);
            return record;
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
  update(data) {
    return this.model
      .findOne({ _id: data.id })
      .exec()
      .then(record => {
        delete data.id;
        Object.keys(data).map(field => {
          record[field] = data[field];
        });
        return record
          .save()
          .then(user => {
            return user;
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
  delete(data) {
    return this.model
      .findOneAndRemove({ _id: data.id })
      .exec()
      .then(record => {
        if (!record) {
          return new Error("Invalid request product does't exist.");
        }
        return Category.findOneAndUpdate(
          { "subCategory.product": data.id },
          { "$pull": { "subCategory.$.product":  data.id  } }
        )
          .exec()
          .then(record => {
            console.log(record)
            return {message: "Product deleted successfully!"};
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
  createImage(user, data) {
    return this.model
      .findById(user.id)
      .exec()
      .then(record => {
        if (!record) {
          return new Error("Invalid request user does't exist.");
        }

        const image = record.image.create(data);
        record.image.push(image);

        return record
          .save()
          .then(updated => {
            return image;
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
  updateImage(user, data) {
    return this.model
      .findOne({ _id: user.id })
      .exec()
      .then(user => {
        let image = user.image.id(data.id);

        if (!image) throw new Error("Image not found");

        delete data.id;
        Object.keys(data).map(field => {
          image[field] = data[field];
        });

        return user
          .save()
          .then(user => {
            return image;
          })
          .catch(error => {
            return error;
          });
      })
      .catch(error => {
        return error;
      });
  }

  // this will delete the user image
  deleteImage(user, data) {
    return this.model
      .findOne({ _id: user.id })
      .exec()
      .then(user => {
        user.image.pull(data.id);
        return user
          .save()
          .then(user => {
            return { message: "Image deleted successfully!" };
          })
          .catch(error => {
            return error;
          });
      })
      .catch(error => {
        return error;
      });
  }
}
const product_controller = new ProductController();
module.exports = product_controller;
