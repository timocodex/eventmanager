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
    forums: async (root, args, { models }) => {
      return models.Forum.findAll({ where: { EventId: args.EventId } });
    }
  },
  Forum: {},
  ForumObject: _graphqlTypeJson2.default,
  Mutation: {
    addForum: async (root, args, { models }) => {
      try {
        const forum = await models.Forum.create({
          id: (0, _idGenerator2.default)(),
          title: args.forum.title,
          content: args.forum.content,
          EventId: args.forum.EventId
        });
        return {
          ok: true,
          forum
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