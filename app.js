/**
 * Application Entry point
 * @type {createApplication}
 */
const express = require('express');
const voyagerMiddleware = require('graphql-voyager/middleware').express;
const bodyParser = require('body-parser');
const logger = require('morgan');
const fs = require('fs');
const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');
const winston = require('winston');
const moment = require('moment');

const expressGraphQL = require('express-graphql');
const jwt = require('express-jwt');

const User = require('./models/User');

// let's import the schema file we just created
const GraphQLSchema = require('./graphql');
const cors = require('cors')

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 *
 * Default path: .env (You can remove the path argument entirely, after renaming `.env.example` to `.env`)
 */
dotenv.config()

//const UploadProfilePicture = require('./middleware/uploadProfilePicture');

/**
 * Create Express server.
 */
const app = express();
app.use(cors())
/**
 * Connect to MongoDB.
 */
mongoose.connect(process.env.MONGODB, { useNewUrlParser: true });
mongoose.connection.on('error', function () {
    console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
    process.exit(1);
}).on('open', function () {
    console.log('Connection extablised with MongoDB')
});
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('debug', true);


/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 4000);

app.use(logger('dev'));

app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 5000}));
app.use(bodyParser.json({limit: '50mb'}));


/**
 * GraphQL server
 */

app.use('/graphql', jwt({
    secret: process.env.JWT_SECRET_KEY,
    requestProperty: 'auth',
    credentialsRequired: false,
}));

app.use(function(err, req, res, next) {
    if(err.name === 'UnauthorizedError') {
      res.status(err.status).send({message:err.message});
      return;
    }
 next();
});

// =========== GraphQL setting  ========== //
app.use('/graphql', async (req, res, done) => {
    var userId = (req.auth && req.auth.id ) ? req.auth.id : undefined;
    const user = ( userId ) ? await User.findById(userId): undefined;
    req.context = {
        user: user,
    }
        
    done();
});
//app.use('/graphql', UploadProfilePicture);
app.use('/graphql', expressGraphQL(req => ({
        schema: GraphQLSchema,
        context: req.context,
        graphiql: process.env.NODE_ENV === 'development',
    })
));
// =========== GraphQL setting END ========== //
app.use('/voyager', voyagerMiddleware({ endpointUrl: '/graphql' }));

/**
 * Start Express server.
 */
app.listen(app.get('port'), function () {
    console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

module.exports = app;