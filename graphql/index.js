const GraphQL = require('graphql');
const {
	GraphQLObjectType,
	GraphQLSchema,
} = GraphQL;


// import the user query file we created
const UserQuery = require('./queries/User');
const InitQuery = require('./queries/Init');
const CategoryQuery = require('./queries/Category');
const ProductQuery = require('./queries/Product');

// import the user mutation file we created
const UserMutation = require('./mutations/User');
const CategoryMutation = require('./mutations/Category')
const ProductMutation = require('./mutations/Product')
const SiteMutation = require('./mutations/Site')
// lets define our root query
const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	description: 'This is the default root query provided by the backend',
	fields: {
	    // Init
        init: InitQuery.index(),
	    // User
		users: UserQuery.index(),
		user: UserQuery.single(),
		me: UserQuery.me(),
		userAddress: UserQuery.userAddress(),
		userOrder: UserQuery.userOrder(),
		usersOrder: UserQuery.usersOrder(),
		sumOrder: UserQuery.sumOrder(),
		myOrder: UserQuery.myOrder(),
		//Category
		categories:CategoryQuery.index(),
		category:CategoryQuery.single(),
		//Product
		products:ProductQuery.index(),
		product:ProductQuery.single(),
		productSearch:ProductQuery.search()
	},
});


// lets define our root mutation
const RootMutation = new GraphQLObjectType({
	name: 'Mutation',
	description: 'Default mutation provided by the backend APIs',
	fields: {
	    // User
        loginUser: UserMutation.login(),
		addUser: UserMutation.create(),
		updateUser: UserMutation.update(),
		addDeviceTokenUser: UserMutation.fcm(),
		addUserAddress: UserMutation.createAddress(),
		updateUserAddress: UserMutation.updateAddress(),
		deleteUserAddress: UserMutation.deleteAddress(),
		addUserOrder:UserMutation.createOrder(),
		createPayment:UserMutation.createPayment(),
		updateOrderStatus:UserMutation.updateOrderStatus(),
		cancelOrder:UserMutation.cancelOrder(),
		//updateUserOrder:UserMutation.updateOrder(),
		
		//Category
		addCategory:CategoryMutation.create(),
		updateCategory:CategoryMutation.updateSubcategory(),
		deleteCategory:CategoryMutation.delete(),
		addSubCategory:CategoryMutation.createSubcategory(),
		updateSubCategory:CategoryMutation.updateSubcategory(),
		deleteSubCategory:CategoryMutation.deleteSubcategory(),
		//Product
		addProduct:ProductMutation.create(),
		updateProduct:ProductMutation.update(),
		deleteProduct:ProductMutation.delete(),
		addProductImage:ProductMutation.createImage(),
		updateProductImage:ProductMutation.updateImage(),
		deleteProductImage:ProductMutation.deleteImage(),
		//Site
		updateSite:SiteMutation.update(),
		addSiteImage:SiteMutation.createImage(),
		updateSiteImage:SiteMutation.updateImage(),
		deleteSiteImage:SiteMutation.deleteImage(),

	},
});



// export the schema
module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: RootMutation,
});

