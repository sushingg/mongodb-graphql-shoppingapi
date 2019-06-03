const GraphQL = require('graphql');
const {
	GraphQLObjectType,
	GraphQLString,
    GraphQLBoolean,
	GraphQLID,
	GraphQLInt,
    GraphQLList,
} = GraphQL;

const Generic = require('./Generic');
ProductType = require('./Product')

const UserType = new GraphQL.GraphQLObjectType({
	name: 'OrderProduct',
	description: 'OrderProduct type for managing all the user\'s OrderProduct in our application.',

	fields: () => ({
		id: {
			type: GraphQLID,
			description: 'ID of the OrderProduct, Generated automatically by MongoDB',
		},
        slug: {
            type:  GraphQLString,
			description: 'Product slug',
		},
        title: {
			type: GraphQLString,
			description: 'Product title',
		},
        price: {
			type: GraphQLString,
			description: 'Product price',
		},
        option: {
			type: GraphQLString,
			description: 'Product option',
		},
        quantity: {
			type: GraphQLInt,
			description: 'Product quantity',
		},
		product: {
			type: ProductType,
			description: 'Product ref',
		},
		createdAt: {
			type: GraphQLString,
			description: 'Generate system to allow user to have secure resource access',
		},
		updatedAt: {
			type: GraphQLString,
			description: 'Date and time when this users account was last updated',
		}

	})

});


module.exports = UserType;

