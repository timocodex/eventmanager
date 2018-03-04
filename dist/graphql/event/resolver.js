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
    events: async (root, args, { models }) => {
      if (args.UserId) {
        console.log(args);
        let uDivision = await models.UserDivisionRole.findAll({ where: { UserId: args.UserId } });
        let allEvent = [];
        if (uDivision.length > 0) {
          for (let i = 0, n = uDivision.length; i < n; i++) {
            let x = uDivision[i];
            let div = await models.Division.findById(x.DivisionId);
            let event = await models.Event.findById(div.EventId);
            let role = await models.Role.findById(x.RoleId);
            let obj = Object.assign(event, { myRole: role.name });
            allEvent.push(obj);
          }
        }
        return allEvent;
      } else {
        return models.Event.findAll();
      }
    }
  },
  Event: {
    title: ({ title }) => title.toUpperCase(),
    management: async root => {
      let division = await root.getDivisions({ where: { name: "management" } });
      return division[0];
    },
    divisions: async (root, args, { models }) => {
      return await root.getDivisions({ where: { name: { $not: "management" } } });
    },
    //   myRole:async (root,args,{models})=>{
    //       return root.members
    //     //let uEvent =  await models.UserEvent.findOne({where:{UserId:,EventId:root.id}}) 
    //   },
    pictures: async root => {
      return root.getFiles();
    },
    //   members: (root,args,{models}) =>{
    //     // const findByUserLoader = new DataLoader(Promise.resolve(root.getUsers()));
    //     // return findByUserLoader.load(root)
    //     return root.getUsers()
    //   },
    incomeExpense: root => {
      return root.getIncomeExpenses();
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
        const divisi = await models.Division.create({
          id: (0, _idGenerator2.default)(),
          name: 'management',
          EventId: event.id
        });
        const userDiv = await models.UserDivisionRole.create({
          id: (0, _idGenerator2.default)(),
          UserId: args.event.UserId,
          RoleId: findAdmin.id,
          DivisionId: divisi.id
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