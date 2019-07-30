const option = require("../../config/options");
const Site = require("../../models/Site");

class InitController {
  constructor(model) {
    this.model = Site;
  }
  // this will find all the records in database and return it
  index() {
    return this.model
      .findOne({})
      .exec()
      .then(records => {
          //console.log(records)
        return records;
      })
      .catch(error => {
        return error;
      });
  }
  update(data) {
    var query = {},
      update = data,
      options = { upsert: true, new: true, setDefaultsOnInsert: true };

    // Find the document
    return this.model
      .findOneAndUpdate(query, update, options)
      .exec()
      .then(record => {
        /*delete data.id;
            Object.keys(data).map(field => {
              record[field] = data[field];
            });*/
        return record;
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
  // this will insert a new record in database
  createImage(data) {
    return this.model
      .findOne({})
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
      .findOne({ "image._id": data.id })
      .exec()
      .then(record => {
        record.image.pull(data.id);
        return record
          .save()
          .then(record => {
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

const init = new InitController();
module.exports = init;
