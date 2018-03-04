'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _idGenerator = require('../helpers/idGenerator');

var _idGenerator2 = _interopRequireDefault(_idGenerator);

var _formatErrors = require('../helpers/formatErrors');

var _formatErrors2 = _interopRequireDefault(_formatErrors);

var _graphqlTypeJson = require('graphql-type-json');

var _graphqlTypeJson2 = _interopRequireDefault(_graphqlTypeJson);

var _dataloader = require('dataloader');

var _dataloader2 = _interopRequireDefault(_dataloader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  Query: {
    events: (root, args, { models }) => {
      console.log(root);
      return models.Event.findAll();
    }
  },
  Event: {
    title: ({ title }) => title.toUpperCase(),
    pictures: root => {
      return root.getFiles();
    },
    members: (root, args, { models }) => {
      // const findByUserLoader = new DataLoader(Promise.resolve(root.getUsers()));
      // return findByUserLoader.load(root)
      return root.getUsers();
    },
    finances: root => {
      return root.getFinances();
    }
  },
  EventObject: _graphqlTypeJson2.default,
  Mutation: {
    addEvent: async (root, args, { models }) => {
      try {
        console.log(args);
        const event = await models.Event.create({
          id: (0, _idGenerator2.default)(),
          title: args.event.title,
          content: args.event.content,
          eventDate: args.event.eventDate
        });
        const findAdmin = await models.Role.findOne({ where: { name: 'admin' } });
        const findDivision = await models.Division.findOne({ where: { name: '-' } });
        const userEvent = await models.UserEvent.create({
          id: (0, _idGenerator2.default)(),
          EventId: event.id,
          UserId: args.event.UserId,
          RoleId: findAdmin.id,
          DivisionId: findDivision.id
        });
        const file = await models.File.create({
          id: (0, _idGenerator2.default)(),
          path: args.event.path,
          EventId: event.id
        });
        return {
          ok: true,
          event
        };
      } catch (e) {
        console.log(e.message);
        return {
          ok: false,
          errors: (0, _formatErrors2.default)(e, models)
        };
      }
    }
  }
};