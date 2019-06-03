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
      type: CategoryType,
      description: "Add new User",

      args: {
        slug: {
          type: new GraphQLNonNull(GraphQLString),
          description: "Enter full name, Cannot be left empty"
        },
        title: {
          type: new GraphQLNonNull(GraphQLString),
          description: "Enter email"
        },
        subCategory: {
          type: Generic.SubCategoryInputType
        }
      },
      resolve(parent, fields) {
        return CategoryResolver.create(fields);
      }
    };
  },

  update() {
    return {
      type: CategoryType,
      description: "Update category details",
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
          description: "Id of category"
        },
        slug: {
          type: GraphQLString,
          description: "Slug represent of category uri"
        },
        title: {
          type: GraphQLString,
          description: "category title"
        }
      },
      resolve(parent, fields, context, info) {
        if (auth.isAuthenticated(context)) {
          return CategoryResolver.update(fields);
        }
      }
    };
  },
  delete() {
    return {
      type: Generic.messageOutputType,
      description: "Delete Category",
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString),
          description: "Id of Product to delete"
        }
      },
      resolve(parent, fields, context, info) {
        if (auth.isAuthenticated(context)) {
          return CategoryResolver.delete(fields);
        }
      }
    };
  },
  createSubcategory() {
    return {
      type: CategoryType,
      description: "Add new Image",
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString),
          description: "Category id"
        },
        slug: {
          type: GraphQLString,
          description: "Slug represent of subcategory uri"
        },
        title: {
          type: GraphQLString,
          description: "subcategory title"
        }
      },
      resolve(parent, fields, context, info) {
        if (auth.isAuthenticated(context)) {
          return CategoryResolver.createSubCategory(fields)
        }
      }
    };
  },
  updateSubcategory() {
    return {
      type: CategoryType,
      description: "Update Subcategory details",
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString),
          description: "Subcategory id"
        },
        slug: {
          type: GraphQLString,
          description: "Slug represent of category uri"
        },
        title: {
          type: GraphQLString,
          description: "category title"
        }
      },
      resolve(parent, fields, context, info) {
        if (auth.isAuthenticated(context)) {
          return CategoryResolver.updateSubCategory(fields);
        }
      }
    };
  },
  deleteSubcategory() {
    return {
      type: Generic.messageOutputType,
      description: "Delete Subcategory",
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString),
          description: "Id of Subcategory to delete"
        }
      },
      resolve(parent, fields, context, info) {
        if (auth.isAuthenticated(context)) {
          return CategoryResolver.deleteSubCategory(fields);
        }
      }
    };
  }
};
