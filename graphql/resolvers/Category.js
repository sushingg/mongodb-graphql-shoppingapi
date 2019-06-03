const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const Category = require("../../models/Category");
const option = require("../../config/options");
const moment = require("moment");

class CategoryController {
  constructor(model) {
    this.model = Category;
  }

  // this will find all the records in database and return it
  index() {
    return this.model
      .find()
      .populate({path: 'subCategory.product',model: 'Product'})
      .sort("createdAt")
      .exec()
      .then(records => {
        console.log(records)
        return records;
      })
      .catch(error => {
        return error;
      });
  }

  // this will find a single record based on id and return it.
  single(options) {
    if (!options.slug){
      console.log('hi')
    return this.model
      .findOne({ _id: options.id })//
      //.findOne( { subCategory: { $elemMatch: { _id: options.slug } } })
      .populate('Product')
      .exec()
      .then(record => {
        console.log(record)
        return record;
      })
      .catch(error => {
        return error;
      });
    }else{
      return this.model
      //.findOne({ _id: options.id })//
      .findOne( { subCategory: { $elemMatch: { _id: options.slug } } })
      .exec()
      .then(record => {
        console.log(record)
        return record;
      })
      .catch(error => {
        return error;
      });
    }
  }

  // this will insert a new record in database
  create(data) {
    const record = new this.model(data);
    return record.save().catch(error => {
      return error;
    });
  }

  // this will update existing record in database
  update(user, data) {
    return this.model
      .findOne({ _id: user.id })
      .exec()
      .then(record => {
        Object.keys(data).map(field => {
          record[field] = data[field];
        });
        return record.save().catch(error => {
          return error;
        });
      })
      .catch(error => {
        return error;
      });
  }
  //subcategory
   // this will insert a new record in database
   createSubCategory(data) {
    return this.model
      .findById(data.id)
      .exec()
      .then(record => {
        if (!record) {
          return new Error("Invalid request model does't exist.");
        }
        const sub = record.subCategory.create(data.subCategory);
        record.subCategory.push(sub);

        return record
          .save()
          .then(updated => {
            return sub;
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
  updateSubCategory(data) {
    return this.model
      .findOne({ _id: data.id })
      .exec()
      .then(record => {
        let sub = record.subCategory.id(data.id);

        if (!sub) throw new Error("not found");

        delete data.id;
        Object.keys(data).map(field => {
          sub[field] = data[data.subCategory];
        });

        return record
          .save()
          .then(record => {
            return sub;
          })
          .catch(error => {
            return error;
          });
      })
      .catch(error => {
        return error;
      });
  }

  // this will delete the user subcategory
  deleteSubCategory( data) {
    return this.model
      .findOne({ _id: data.id })
      .exec()
      .then(record => {
        record.subCategory.pull(data.id);
        return record
          .save()
          .then(record => {
            return { message: "deleted successfully!" };
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
const category_controller = new CategoryController();
module.exports = category_controller;
