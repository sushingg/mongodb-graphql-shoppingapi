const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const _ = require("lodash")
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
  index(options) {
    let query = {};
    if(options.category){query.category = options.category}
    if(options.subCategory){query.subCategory = options.subCategory}
    if(options.incDraft != true ){query.published = true}
    options.sort = { createdAt: -1 }
    if (options.sortBy){
      let sort = 1
      if (options.sortType ==="desc") {
        sort = -1
      } 
      switch(options.sortBy) {
        case "title":
          options.sort = { title: sort }
          break;
        case "price":
          options.sort = { price: sort }
          break;
        case "quantity":
          options.sort = { quantity: sort }
          break;
        case "date":
          options.sort = { createdAt: sort }
          break;
      }
    }
    //console.log(options)
    return this.model
      .paginate(query, options)
      .then(records => {
        records['product']=records['docs']
        delete records['docs']
        return records;
      })
      .catch(error => {
        return error;
      });
  }
  search(options) {
    let draft = false
    if(options.incDraft != true ){draft = true}
    let keyword = new RegExp(options.keyword);
    //console.log(options)
    return this.model
      .find({title: { $regex: keyword , $options: 'i' },published:draft })
      .then(records => {
        //console.log(records)
        return records;
      })
      .catch(error => {
        return error;
      });
  }
  // this will find a single record based on id and return it.
  single(options) {
    return this.model
      .findOne(options)
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
    const product = new Product(data);
    console.log(product);
    return Category.findOneAndUpdate(
      { "subCategory.slug": data.subCategory },
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
      .findByIdAndUpdate(data.id,  data )
      .exec()
      .then(record => {
        /*delete data.id;
        Object.keys(data).map(field => {
          record[field] = data[field];
        });*/
        return record
          /*.save()
          .then(user => {
            return user;
          })
          .catch(error => {
            return error;
          });*/
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
          { $pull: { "subCategory.$.product": data.id } }
        )
          .exec()
          .then(record => {
            console.log(record);
            return { message: "Product deleted successfully!" };
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
  createImage(data) {
    return this.model
      .findById(data.id)
      .exec()
      .then(record => {
        if (!record) {
          return new Error("Invalid request user does't exist.");
        }
        const image = record.image.create(data.image);
        record.image.push(image);

        return record
          .save()
          .then(updated => {
            console.log('saved')
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
  updateImage(data) {
    return this.model
      .findOne({ "image._id": data.id })
      .exec()
      .then(record => {
        let image = record.image.id(data.id);

        if (!image) throw new Error("Image not found");
        console.log(image);
        delete data.id;
        Object.keys(data.image).map(field => {
          image[field] = data.image[field];
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

  // this will delete the user image
  deleteImage(data) {
    return this.model
    .findOneAndUpdate(
      {'image._id':data.id},
      {$pull: {"image": {_id:data.id}}},
      {safe: true, upsert: true, new: true}
      ).exec()
    .then(record => {
      
      return { message: "Image deleted successfully!" };
        
    })
    .catch(error => {
      return error;
    });
  }
}
const product_controller = new ProductController();
module.exports = product_controller;
