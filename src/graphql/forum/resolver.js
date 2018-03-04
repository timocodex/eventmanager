import gen from '../../helpers/idGenerator'
import formatErrors from '../../helpers/formatErrors';
import GraphQLJSON from 'graphql-type-json';
import DataLoader from 'dataloader'

exports.resolver = {
    Query: {
        forums: async (root,args,{models})=>{
            return models.Forum.findAll({where:{EventId:args.EventId}})
        },
      },
      Forum:{
        
      },
      ForumObject: GraphQLJSON,
      Mutation: {
        addForum: async (root,args,{models}) =>{
          try{
            const forum = await models.Forum.create({
              id:gen(),
              title:args.forum.title,
              content:args.forum.content,
              EventId:args.forum.EventId
            })
            return {
              ok:true,
              forum
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