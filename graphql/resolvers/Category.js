const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const Category = require("../../models/Category");
const Product = require("../../models/Product");
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
        var query   = {};
        var options = {
            page: 1, 
            limit: 3
        };
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
      .findByIdAndUpdate(
        data.id,
        {$push: {"subCategory": {slug: data.slug, title: data.title}}},
        {safe: true, upsert: true, new: true}
        ).exec()
      .then(record => {
        if (!record) {
          return new Error("Invalid request model does't exist.");
        }
        

        return record
          
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
      .findOneAndUpdate(
        {'subCategory._id':data.id},
        {$pull: {"subCategory": {_id:data.id}}},
        {safe: true, upsert: true, new: true}
        ).exec()
      .then(record => {
        
        return record
          
      })
      .catch(error => {
        return error;
      });
  }




}
const category_controller = new CategoryController();
module.exports = category_controller;
