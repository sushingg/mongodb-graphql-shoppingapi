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
const ProductType = require("../types/Product");

// import the user resolver we created
const CategoryResolver = require("../resolvers/Category");
const ProductResolver = require("../resolvers/Product");

module.exports = {
  create() {
    return {
      type: ProductType,
      description: "Add new Product",
      args: {
        subcatId: {
          type: new GraphQLNonNull(GraphQLString),
          description: "Sub Category id"
        },
        product: {
          type: Generic.ProductInputType,
          description: "Enter product"
        }
      },
      resolve(parent, fields, context, info) {
        if (auth.isAuthenticated(context)) {
          return ProductResolver.create(fields);
        }
      }
    };
  },
  update() {
    return {
      type: ProductType,
      description: "Update user details",
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
          description: "Id of product"
        },
        slug: {
          type: GraphQLString,
          description: "Slug represent of product uri"
        },
        title: {
          type: GraphQLString,
          description: "Product title"
        },
        price: {
          type: GraphQLInt,
          description: "Product price"
        },
        quantity: {
          type: GraphQLInt,
          description: "Product quantity"
        },
        description: {
          type: GraphQLString,
          description: "Product option"
        },
        descriptionHtml: {
          type: GraphQLString,
          description: "Product option"
        },
        published: {
          type: GraphQLString,
          description: "Product option"
        },
        options: {
          type: GraphQLString,
          description: "Product option"
        }
      },
      resolve(parent, fields, context, info) {
        if (auth.isAuthenticated(context)) {
          return ProductResolver.update(fields);
        }
      }
    }
  },
  delete() {
    return {
      type: Generic.messageOutputType,
      description: "Delete Product",
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString),
          description: "Id of Product to delete"
        }
      },
      resolve(parent, fields, context, info) {
        if (auth.isAuthenticated(context)) {
          return ProductResolver.delete(fields);
        }
      }
    };
  },
  createImage() {
    return {
      type: ProductType,
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
        if (auth.isAuthenticated(context)) {
          return ProductResolver.createImage(fields);
        }
      }
    };
  },
  updateImage() {
    return {
      type: ProductType,
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
        if (auth.isAuthenticated(context)) {
          return ProductResolver.updateImage(fields);
        }
      }
    }
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
        if (auth.isAuthenticated(context)) {
          return ProductResolver.deleteImage(fields);
        }
      }
    };
  },
};
