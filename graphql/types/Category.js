const GraphQL = require('graphql');
const {
	GraphQLObjectType,
	GraphQLString,
    GraphQLBoolean,
	GraphQLID,
	GraphQLInt,
    GraphQLList,
} = GraphQL;

const SubCategory = require('./SubCategory');

const CategoryType = new GraphQL.GraphQLObjectType({
	name: 'Category',
	description: 'Category type for managing all the categories in our application.',

	fields: () => ({
		id: {
			type: GraphQLID,
			description: 'ID of the category, Generated automatically by MongoDB',
		},
		slug: {
			type: GraphQLString,
			description: 'Category slug',
		},
		title: {
			type: GraphQLString,
			description: 'Category title',
		},
		subCategory: {
			type: new GraphQLList(SubCategory),
			
			description: 'Category subcategory',
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


module.exports = CategoryType;

