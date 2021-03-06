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
  GraphQLBoolean
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
        slug: {
          type: GraphQLString,
          description: "Slug represent of product uri"
        },
        title: {
          type: GraphQLString,
          description: "Product title"
        },
        subCategory: {
          type: GraphQLString,
          description: "SubCategory slug"
        },
        category: {
          type: GraphQLString,
          description: "Category slug"
        },
      },
      resolve(parent, fields, context, info) {
        if (auth.isSuper(context)) {
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
          type: GraphQLBoolean,
          description: "Product option"
        },
        options: {
          type: GraphQLString,
          description: "Product option"
        }
      },
      resolve(parent, fields, context, info) {
        if (auth.isSuper(context)) {
          return ProductResolver.update(fields);
        }
      }
    };
  },
  delete() {
    return {
      type: Generic.messageOutputType,
      description: "Delete Product",
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
          description: "Id of Product to delete"
        }
      },
      resolve(parent, fields, context, info) {
        if (auth.isSuper(context)) {
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
        if (auth.isSuper(context)) {
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
          type: new GraphQLNonNull(GraphQLID),
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
