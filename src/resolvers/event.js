import gen from '../helpers/idGenerator'
import formatErrors from '../helpers/formatErrors';
import GraphQLJSON from 'graphql-type-json';
import DataLoader from 'dataloader'

export default {
    Query: {
      events: (root,args,{models})=>{
        console.log(root)
        return models.Event.findAll()
      },
    },
    Event:{
      title: ({title}) => title.toUpperCase(),
      pictures: (root) =>{
          return root.getFiles()
      },
      members: (root,args,{models}) =>{
        // const findByUserLoader = new DataLoader(Promise.resolve(root.getUsers()));
        // return findByUserLoader.load(root)
        return root.getUsers()
      },
      finances:(root) =>{
        return root.getFinances()
      }
    },
    EventObject: GraphQLJSON,
    Mutation: {
      addEvent: async (root,args,{models}) =>{
        try{
          console.log(args)
          const event = await models.Event.create({
            id:gen(),
            title:args.event.title,
            content:args.event.content,
            eventDate:args.event.eventDate
          })
          const findAdmin = await models.Role.findOne({where:{name:'admin'}})
          const findDivision = await models.Division.findOne({where:{name:'-'}})
          const userEvent = await models.UserEvent.create({
            id:gen(),
            EventId:event.id,
            UserId:args.event.UserId,
            RoleId:findAdmin.id,
            DivisionId:findDivision.id
          })
          const file = await models.File.create({
            id:gen(),
            path:args.event.path,
            EventId:event.id
          })
          return {
            ok:true,
            event
          }
        }catch(e){
          console.log(e.message)
          return {
            ok: false,
            errors: formatErrors(e,models)
          };
        }
      },
    },
  };