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
const OrderProduct = require('./OrderProduct');
const Address = require('./Address');

const UserType = new GraphQL.GraphQLObjectType({
	name: 'Order',
	description: 'Order type for managing all the user\'s Order in our application.',

	fields: () => ({
		id: {
			type: GraphQLID,
			description: 'ID of the Order, Generated automatically by MongoDB',
		},
        PaymentId: {
            type:  GraphQLString,
			description: 'Order payment id',
		},
        Total: {
			type: GraphQLInt,
			description: 'Order total',
		},
		Status: {
			type: GraphQLInt,
			description: 'Order status',
		},
        address: {
			type: new GraphQLList(Address),
			description: 'Order address',
		},
		orderProduct: {
			type: new GraphQLList(OrderProduct),
			description: 'Order products',
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

