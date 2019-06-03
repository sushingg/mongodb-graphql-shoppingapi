const GraphQL = require('graphql');
const auth = require('../../config/auth');

const {
	GraphQLList,
	GraphQLID,
    GraphQLString,
	GraphQLNonNull,
} = GraphQL;

// import the user type we created
const ProductType = require('../types/Product');
const AddressType = require('../types/Address');

// import the user resolver we created
const ProductResolver = require('../resolvers/Product');


module.exports = {

	index() {
		return {
			type: new GraphQLList(ProductType),
			description: 'This will return all the users present in the database',
			resolve(parent, args, context, info) {
				return ProductResolver.index({});
			}
		}
	},

	single() {
		return {
			type: ProductType,
			description: 'This will return data of a single users based on the id provided',
			args: {
				id: {
					type: new GraphQLNonNull(GraphQLID),
					description: 'Please enter product id',
				}
			},
			resolve(parent, args, context, info) {
				return ProductResolver.single({ id: args.id });
			}
		}
	}



};

