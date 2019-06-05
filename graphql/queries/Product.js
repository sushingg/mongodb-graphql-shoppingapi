const GraphQL = require('graphql');
const auth = require('../../config/auth');

const {
	GraphQLList,
	GraphQLID,
    GraphQLString,
	GraphQLNonNull,
	GraphQLInt,
} = GraphQL;

const Generic = require("../types/Generic");
// import the user type we created
const ProductType = require('../types/Product');
const AddressType = require('../types/Address');

// import the user resolver we created
const ProductResolver = require('../resolvers/Product');


module.exports = {

	index() {
		return {
			type: Generic.productPages,
			description: 'This will return all the users present in the database',
			args: {
				page: {
					type: GraphQLInt,
					description: 'query page',
				},
				limit: {
					type: GraphQLInt,
					description: 'number of item on page',
				},
				category: {
					type: GraphQLString,
					description: 'Category Slug',
				},
				subCategory: {
					type: GraphQLString,
					description: 'SubCategory Slug',
				}
			},
			resolve(parent, args, context, info) {
				return ProductResolver.index(args);
			}
		}
	},

	single() {
		return {
			type: ProductType,
			description: 'This will return data of a single users based on the id provided',
			args: {
				id: {
					type: GraphQLID,
					description: 'Please enter product id',
				},
				slug: {
					type: GraphQLString,
					description: 'Please enter product slug',
				}
			},
			resolve(parent, args, context, info) {
				if(args.id){
					args._id = args.id
					delete args.id
				}
				return ProductResolver.single(args);
			}
		}
	}



};
