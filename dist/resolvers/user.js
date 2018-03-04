'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _idGenerator = require('../helpers/idGenerator');

var _idGenerator2 = _interopRequireDefault(_idGenerator);

var _formatErrors = require('../helpers/formatErrors');

var _formatErrors2 = _interopRequireDefault(_formatErrors);

var _auth = require('../helpers/auth');

var _graphqlTypeJson = require('graphql-type-json');

var _graphqlTypeJson2 = _interopRequireDefault(_graphqlTypeJson);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  Query: {
    users: (root, args, { models }) => {
      console.log(root);
      return models.User.findAll();
    }
  },
  //   User:{
  //     news:(user) =>{
  //       return user.getNews()
  //     }
  //   },
  UserObject: _graphqlTypeJson2.default,
  Mutation: {
    addUser: async (root, args, { models, SECRET, SECRET2 }) => {
      try {
        const user = await models.User.create({
          id: (0, _idGenerator2.default)(),
          password: args.user.password,
          email: args.user.email,
          firstName: args.user.firstName,
          lastName: args.user.lastName
        });
        const refreshTokenSecret = user.password + SECRET2;
        const [token, refreshToken] = await (0, _auth.createTokens)(user, SECRET, refreshTokenSecret);
        return {
          ok: true,
          user,
          token,
          refreshToken
        };
      } catch (e) {
        return {
          ok: false,
          errors: (0, _formatErrors2.default)(e, models)
        };
      }
    },
    login: async (root, { email, password }, { models, SECRET, SECRET2 }) => (0, _auth.tryLogin)(email, password, models, SECRET, SECRET2)
  }
};