import gen from '../../helpers/idGenerator'
import formatErrors from '../../helpers/formatErrors';
import GraphQLJSON from 'graphql-type-json';
import DataLoader from 'dataloader'


exports.resolver = {
    Query:{
        divisions: (root,args,{models})=>{
            return  models.Division.findAll({where:{EventId:args.EventId}})
        }
    },
    Division:{
        members: async (root,args,{models})=>{
            return root.getUsers()
        }
    },
    Mutation:{
        addDivision: async (root,args,{models}) => {
            try{
                let division = await models.Division.create({
                    id:gen(),
                    EventId:args.division.EventId,
                    name:args.division.name
                })
                return{
                    ok:true,
                    division
                }
            }catch(e){
                return{
                    ok:false,
                    errors: formatErrors(e,models)
                }
            }
        }
    }
}