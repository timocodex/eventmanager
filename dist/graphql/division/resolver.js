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
        divisions: (root, args, { models }) => {
            return models.Division.findAll({ where: { EventId: args.EventId } });
        }
    },
    Division: {
        members: async (root, args, { models }) => {
            return root.getUsers();
        }
    },
    Mutation: {
        addDivision: async (root, args, { models }) => {
            try {
                let division = await models.Division.create({
                    id: (0, _idGenerator2.default)(),
                    EventId: args.division.EventId,
                    name: args.division.name
                });
                return {
                    ok: true,
                    division
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