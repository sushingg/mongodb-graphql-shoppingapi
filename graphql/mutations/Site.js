const GraphQL = require("graphql");
var validator = require("validator");

const auth = require("../../config/auth");
const option = require("../../config/options");
const Generic = require("../types/Generic");

const {
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList
} = GraphQL;

// import the user type we created
const CategoryType = require("../types/Category");

// import the user resolver we created
const InitResolver = require("../resolvers/Init");
module.exports = {
  update() {
    return {
      type: Generic.initOutputType,
      description: "Add new User",
      args: {
        title: {
          type: new GraphQLNonNull(GraphQLString),
          description: "Enter email"
        }
      },
      resolve(parent, fields) {
        if (auth.isSuper(context)) {
          return InitResolver.update(fields);
        }
      }
    };
  },
  createImage() {
    return {
      type: Generic.initOutputType,
      description: "Add new Image",
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString),
          description: "Product id"
        },
        image: {
          type: Generic.ImageInput,
          description: "Enter image"
        }
      },
      resolve(parent, fields, context, info) {
        if (auth.isSuper(context)) {
          return ProductResolver.createImage(fields);
        }
      }
    };
  },
  updateImage() {
    return {
      type: Generic.initOutputType,
      description: "Update Image details",
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString),
          description: "Image id"
        },
        image: {
          type: Generic.ImageInput,
          description: "Enter image"
        }
      },
      resolve(parent, fields, context, info) {
        if (auth.isSuper(context)) {
          return ProductResolver.updateImage(fields);
        }
      }
    };
  },
  deleteImage() {
    return {
      type: Generic.messageOutputType,
      description: "Delete Image",
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString),
          description: "Id of Image to delete"
        }
      },
      resolve(parent, fields, context, info) {
        if (auth.isSuper(context)) {
          return ProductResolver.deleteImage(fields);
        }
      }
    };
  }
};
