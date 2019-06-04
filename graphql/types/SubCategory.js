const GraphQL = require('graphql');
const {
	GraphQLObjectType,
	GraphQLString,
    GraphQLBoolean,
	GraphQLID,
	GraphQLInt,
    GraphQLList,
} = GraphQL;

const ProductType = require('./Product');

const SubCategoryType = new GraphQL.GraphQLObjectType({
	name: 'SubCategory',
	description: 'Subcategory type for managing all the subcategories in our application.',

	fields: () => ({
		id: {
			type: GraphQLID,
			description: 'ID of the category, Generated automatically by MongoDB',
		},
		slug: {
			type: GraphQLString,
			description: 'SubCategory slug',
		},
		title: {
			type: GraphQLString,
			description: 'SubCategory title',
		},
		product: {
			type: new GraphQLList(ProductType),
			description: 'Category product',
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


module.exports = SubCategoryType;

