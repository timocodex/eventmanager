import gen from '../../helpers/idGenerator'
import formatErrors from '../../helpers/formatErrors';
import GraphQLJSON from 'graphql-type-json';
import DataLoader from 'dataloader'

exports.resolver = {
    Query: {
        forums: (root,args,{models})=>{
            return models.Message.findAll({where:{ForumId:args.ForumId}})
        },
      },
      Message:{
        user: (root,args,{models}) =>{
            return models.Message.getUser()
        }
      },
      MessageObject: GraphQLJSON,
      Mutation: {
        addMessage: async (root,args,{models}) =>{
          try{
            const message = await models.Message.create({
              id:gen(),
              content:args.message.content,
              ForumId:args.message.ForumId,
              UserID:args.message.UserId
            })
            return {
              ok:true,
              message
            }
          }catch(e){
            return {
              ok: false,
              errors: formatErrors(e,models)
            };
          }
        },
      },
}