'use strict';

var _idGenerator = require('../../helpers/idGenerator');

var _idGenerator2 = _interopRequireDefault(_idGenerator);

var _formatErrors = require('../../helpers/formatErrors');

var _formatErrors2 = _interopRequireDefault(_formatErrors);

var _auth = require('../../helpers/auth');

var _graphqlTypeJson = require('graphql-type-json');

var _graphqlTypeJson2 = _interopRequireDefault(_graphqlTypeJson);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.resolver = {
  Query: {
    users: (root, args, { models }) => {
      console.log(root);
      return models.User.findAll();
    },
    user: (root, args, { models }) => {
      return models.User.findById(args.UserId);
    }
  },
  // User:{
  //   role:(root) =>{
  //     return root.getRole()
  //   }
  // },
  Member: {
    role: async root => {
      let a = await root.getRoles();
      return a[0];
    }
  },
  UserObject: _graphqlTypeJson2.default,
  Mutation: {
    addUser: async (root, args, { models, SECRET, SECRET2 }) => {
      try {
        let profilePicture = args.user.profilePicture ? args.user.profilePicture : 'https://mbevivino.files.wordpress.com/2011/08/silhouette_default.jpg';
        const user = await models.User.create({
          id: (0, _idGenerator2.default)(),
          password: args.user.password,
          email: args.user.email,
          firstName: args.user.firstName,
          lastName: args.user.lastName,
          profilePicture
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