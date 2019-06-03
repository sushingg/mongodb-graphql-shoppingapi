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
    return this.model
      .findOne({ _id: options.id })//
      //.findOne( { subCategory: { $elemMatch: { _id: options.slug } } })
      .populate({path: 'subCategory.product',model: 'Product'})
      .exec()
      .then(record => {
        console.log(record)
        return record;
      })
      .catch(error => {
        return error;
      });
    
  }

  // this will insert a new record in database
  create(data) {
    const record = new this.model(data);
    return record.save().catch(error => {
      return error;
    });
  }

  // this will update existing record in database
  update( data) {
    return this.model
      .findOne({ _id: data.id })
      .exec()
      .then(record => {
        delete data.id
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
   // this will delete the user address
   delete(data) {
    return this.model
      .findOneAndRemove({ _id: data.id })
      .exec()
      .then(record => {
        if (!record) {
          return new Error("Invalid request category does't exist.");
        }
        return {message: "Category deleted successfully!"};
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
        delete data.id
        const sub = record.subCategory.create(data);
        record.subCategory.push(sub);

        return record
          .save()
          .then(updated => {
            return updated;
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
      .findOne({ 'subCategory._id': data.id })
      .exec()
      .then(record => {
        let sub = record.subCategory.id(data.id);

        if (!sub) throw new Error("not found");
        
        delete data.id;
        console.log(data)
        Object.keys(data).map(field => {
          sub[field] = data[field];
        });

        return record
          .save()
          .then(record => {
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

  // this will delete the user subcategory
  deleteSubCategory( data) {
    return this.model
      .findOne({ 'subCategory._id': data.id })
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




}
const category_controller = new CategoryController();
module.exports = category_controller;
