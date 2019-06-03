const GraphQL = require('graphql');
const {
	GraphQLObjectType,
	GraphQLInputObjectType,
	GraphQLString,
    GraphQLBoolean,
	GraphQLID,
	GraphQLInt,
    GraphQLList,
} = GraphQL;

const Generic = require('./Generic');


const AddressType = new GraphQL.GraphQLObjectType({
	name: 'Address',
	description: 'Address type for managing all the user\'s address in our application.',

	fields: () => ({
		id: {
			type: GraphQLID,
			description: 'ID of the address, Generated automatically by MongoDB',
		},
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



module.exports = AddressType;

