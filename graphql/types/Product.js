const GraphQL = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = GraphQL;

const Generic = require("./Generic");

const ProductType = new GraphQL.GraphQLObjectType({
  name: "Product",
  description:
    "Product type for managing all the Category Product in our application.",

  fields: () => ({
    id: {
      type: GraphQLID,
      description: "ID of the OrderProduct, Generated automatically by MongoDB"
    },
    slug: {
      type: new GraphQLNonNull(GraphQLString),
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
    },
    image: {
      type: new GraphQLList(Generic.Image),
      description: "Product option"
    },
    category: {
      type: GraphQLString,
      description: "Category"
    },
    subCategory: {
      type: GraphQLString,
      description: "Subcategory"
    },
    createdAt: {
      type: GraphQLString,
      description:
        "Generate system to allow user to have secure resource access"
    },
    updatedAt: {
      type: GraphQLString,
      description: "Date and time when this users account was last updated"
    }
  })
});

module.exports = ProductType;
