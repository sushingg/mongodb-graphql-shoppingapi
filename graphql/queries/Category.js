const GraphQL = require('graphql');
const auth = require('../../config/auth');

const {
	GraphQLList,
	GraphQLID,
    GraphQLString,
	GraphQLNonNull,
} = GraphQL;

// import the user type we created
const CategoryType = require('../types/Category');
const AddressType = require('../types/Address');

// import the user resolver we created
const CategoryResolver = require('../resolvers/Category');


module.exports = {

	index() {
		return {
			type: new GraphQLList(CategoryType),
			description: 'This will return all the category present in the database',
			resolve(parent, args, context, info) {
				return CategoryResolver.index({});
			}
		}
	},

	single() {
		return {
			type: CategoryType,
			description: 'This will return data of a single category based on the id provided',
			args: {
				id: {
					type: new GraphQLNonNull(GraphQLID),
					description: 'Please enter category id',
				}
			},
			resolve(parent, args, context, info) {
				//console.log(info.variableValues)
				//console.log(args)
				//return CategoryResolver.single({ id: args.id });
				return CategoryResolver.single(info.variableValues);
			}
		}
	}

};

