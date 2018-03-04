'use strict';

var _idGenerator = require('../../helpers/idGenerator');

var _idGenerator2 = _interopRequireDefault(_idGenerator);

var _formatErrors = require('../../helpers/formatErrors');

var _formatErrors2 = _interopRequireDefault(_formatErrors);

var _graphqlTypeJson = require('graphql-type-json');

var _graphqlTypeJson2 = _interopRequireDefault(_graphqlTypeJson);

var _dataloader = require('dataloader');

var _dataloader2 = _interopRequireDefault(_dataloader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.resolver = {
  Query: {
    forums: (root, args, { models }) => {
      return models.Message.findAll({ where: { ForumId: args.ForumId } });
    }
  },
  Message: {
    user: (root, args, { models }) => {
      return models.Message.getUser();
    }
  },
  MessageObject: _graphqlTypeJson2.default,
  Mutation: {
    addMessage: async (root, args, { models }) => {
      try {
        const message = await models.Message.create({
          id: (0, _idGenerator2.default)(),
          content: args.message.content,
          ForumId: args.message.ForumId,
          UserID: args.message.UserId
        });
        return {
          ok: true,
          message
        };
      } catch (e) {
        return {
          ok: false,
          errors: (0, _formatErrors2.default)(e, models)
        };
      }
    }
  }
};