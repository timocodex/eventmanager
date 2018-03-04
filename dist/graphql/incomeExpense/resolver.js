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
    Query: {},
    IncomeExpense: {
        user: root => root.getUser(),
        verifiedBy: async (root, args, { models }) => {
            let user = await models.User.findById(root.verifiedBy);
            return user;
        }
    },
    IncExpObject: _graphqlTypeJson2.default,
    Mutation: {
        addIncExp: async (root, args, { models }) => {
            try {
                let newIE = await models.IncomeExpense.create({
                    id: (0, _idGenerator2.default)(),
                    picture: args.IncExp.picture,
                    isIncome: args.IncExp.isIncome,
                    EventId: args.IncExp.EventId,
                    value: args.IncExp.value,
                    UserId: args.IncExp.UserId,
                    verified: args.IncExp.verified,
                    verifiedBy: args.IncExp.verifiedBy
                });
                return {
                    ok: true,
                    event
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