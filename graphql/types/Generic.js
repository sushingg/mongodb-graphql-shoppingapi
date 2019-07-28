const GraphQL = require("graphql");
const {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = GraphQL;
const ProductType = require('./Product')
const OrderType = require('./Order')

exports.mobileNumberInputType = new GraphQLInputObjectType({
  name: "mobileNumberInput",
  description: "Accept only mobile number in input",
  fields: () => ({
    mobileNumber: {
      type: GraphQLString,
      description: "Phone number of the user"
    }
  })
});

exports.messageOutputType = new GraphQLObjectType({
  name: "messageOutput",
  description: "Send success message",
  fields: () => ({
    message: {
      type: GraphQLString,
      description: "Success message string"
    }
  })
});

exports.initOutputType = new GraphQLObjectType({
  name: "initOutput",
  description: "Init response structure",
  fields: () => ({
    title: {
      type: GraphQLString,
      description: "Site title"
    },
    image: {
      type: new GraphQLList(this.Image),
      description: "Product option"
    }
  })
});

exports.Image = new GraphQLObjectType({
  name: "Image",
  description: "Image Type",
  fields: () => ({
    id: {
			type: GraphQLID
		},
    altText: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    }
  })
});

exports.ImageInput = new GraphQLInputObjectType({
  name: "ImageInput",
  description: "Image Type",
  fields: () => ({
    altText: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    }
  })
});

exports.SubCategoryInputType = new GraphQL.GraphQLInputObjectType({
  name: "SubCategoryInput",
  description:
    "Subcategory type for managing all the subcategories in our application.",

  fields: () => ({
    slug: {
      type: GraphQLString,
      description: "SubCategory slug"
    },
    title: {
      type: GraphQLString,
      description: "SubCategory title"
    }
  })
});

exports.ProductInputType = new GraphQL.GraphQLInputObjectType({
  name: "ProductInput",
  description:
    "Product type for managing all the Category Product in our application.",

  fields: () => ({
    slug: {
			type: new GraphQLNonNull(GraphQLString) ,
			description: 'Slug represent of product uri',
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
      type: new GraphQLList(this.ImageInput),
      description: "Product option"
    }
  })
});

exports.AddressInputType = new GraphQL.GraphQLInputObjectType({
	name: 'Addressinput',
	description: 'Address type for managing all the user\'s address in our application.',

	fields: () => ({
        firstName: {
			type: GraphQLString,
			description: 'Address firstname',
		},
        lastName: {
			type: GraphQLString,
			description: 'Address lastname',
		},
        addr: {
			type: GraphQLString,
			description: 'Address',
		},
        distric: {
			type: GraphQLString,
			description: 'Address disctric',
		},
		province: {
			type: GraphQLString,
			description: 'Address province',
		},
		mobileNumber: {
			type: GraphQLString,
			description: 'Address mobile number',
		},
        postcode: {
			type: GraphQLString,
			description: 'Address postcode',
		}

	})

});

exports.OrderProductInputType = new GraphQL.GraphQLInputObjectType({
	name: 'OrderProductinput',
	description: 'OrderProduct type for managing all the user\'s OrderProduct in our application.',

	fields: () => ({
        slug: {
            type:  GraphQLString,
			description: 'Product slug',
		},
        quantity: {
			type: GraphQLInt,
			description: 'Product quantity',
		}

	})

});

exports.productPages = new GraphQLObjectType({
  name: "ProductPages",
  description: "Product Pages",
  fields: () => ({
    product: {
			type: new GraphQLList(ProductType)
		},
    total: {
      type: GraphQLInt
    },
    limit: {
      type: GraphQLInt
    },
    page: {
      type: GraphQLInt
    },
    pages: {
      type: GraphQLInt
    }
  })
});
exports.orderPages = new GraphQLObjectType({
  name: "OrderPages",
  description: "Order Pages",
  fields: () => ({
    order: {
			type: new GraphQLList(OrderType)
		},
    total: {
      type: GraphQLInt
    },
    limit: {
      type: GraphQLInt
    },
    page: {
      type: GraphQLInt
    },
    pages: {
      type: GraphQLInt
    }
  })
});