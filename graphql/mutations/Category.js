const GraphQL = require('graphql');
var validator = require('validator');

const auth = require('../../config/auth');
const option = require('../../config/options');
const Generic = require('../types/Generic');

const {
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLList
} = GraphQL;

// import the user type we created
const CategoryType = require('../types/Category');
const ProductType = require('../types/Product');

// import the user resolver we created
const CategoryResolver = require('../resolvers/Category');
const ProductResolver = require('../resolvers/Product')


module.exports = {

    create() {
        return {
            type: CategoryType,
            description: 'Add new User',

            args: {
                slug: {
                    type: new GraphQLNonNull(GraphQLString),
                    description: 'Enter full name, Cannot be left empty',
                },
                title: {
                    type: new GraphQLNonNull(GraphQLString),
                    description: 'Enter email',
                },
                subCategory: {
                    type: Generic.SubCategoryInputType,
                
                },
            },
            resolve(parent, fields) {

                return CategoryResolver.create(fields);
            }
        }
    },

    


};
