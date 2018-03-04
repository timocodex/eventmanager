'use strict';

var _graphqlTools = require('graphql-tools');

var _mergeGraphqlSchemas = require('merge-graphql-schemas');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _apolloServerExpress = require('apollo-server-express');

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _models = require('./models');

var _models2 = _interopRequireDefault(_models);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

process.on('unhandledRejection', (reason, promise) => {
  // Will print "unhandledRejection err is not defined"
  console.log('unhandledRejection at: ', reason.stack || reason);
});

// const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));
// const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema'))); 

const { glue } = require('schemaglue');
const { schema, resolver } = glue('src/graphql');
const executableSchema = (0, _graphqlTools.makeExecutableSchema)({ typeDefs: schema, resolvers: resolver });
const SECRET = 'asdfaweg121fdgsSEFGrgsdgeregeE45';
const SECRET2 = 'werw3rerw45SEFESFESFdrgf545rgrdg';

const server = (0, _express2.default)();
server.use((0, _cors2.default)('*'));
server.set('views', _path2.default.join(__dirname, 'views'));
server.set('view engine', 'ejs');

const addUser = async (req, res, next) => {
  const token = req.headers['x-token'];
  if (token) {
    try {
      const { user } = jwt.verify(token, SECRET);
      req.user = user;
    } catch (err) {
      const refreshToken = req.headers['x-refresh-token'];
      const newTokens = await refreshTokens(token, refreshToken, models, SECRET, SECRET2);
      if (newTokens.token && newTokens.refreshToken) {
        res.set('Access-Control-Expose-Headers', 'x-token, x-refresh-token');
        res.set('x-token', newTokens.token);
        res.set('x-refresh-token', newTokens.refreshToken);
      }
      req.user = newTokens.user;
    }
  }
  next();
};

server.use(addUser);
server.use(_bodyParser2.default.json());
server.use(_bodyParser2.default.urlencoded({ extended: false }));
const upload = require('./routers/uploads');
server.use('/api/uploads', upload);
(0, _models2.default)().then(models => {
  if (!models) {
    console.log('Could not connect to database');
    return;
  }
  server.use('/graphql', _bodyParser2.default.json(), (0, _apolloServerExpress.graphqlExpress)(req => ({
    schema: executableSchema,
    context: {
      models,
      //user: req.user,
      SECRET,
      SECRET2
    }
  })));
  server.use('/graphiql', (0, _apolloServerExpress.graphiqlExpress)({
    endpointURL: '/graphql'
  }));

  server.get('/api', function (req, res) {
    res.send('res');
  });
});

module.exports = server;