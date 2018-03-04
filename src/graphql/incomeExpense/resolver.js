import gen from '../../helpers/idGenerator'
import formatErrors from '../../helpers/formatErrors';
import GraphQLJSON from 'graphql-type-json';
import DataLoader from 'dataloader'

exports.resolver = {
    Query:{

    },
    IncomeExpense:{
        user:(root)=> root.getUser(),
        verifiedBy: async (root,args,{models}) =>{
            let user = await models.User.findById(root.verifiedBy)
            return user
        }
    },
    IncExpObject:GraphQLJSON,
    Mutation:{
        addIncExp:async (root,args,{models})=>{
            try{
                let newIE = await models.IncomeExpense.create({
                    id:gen(),
                    picture:args.IncExp.picture,
                    isIncome:args.IncExp.isIncome,
                    EventId:args.IncExp.EventId,
                    value:args.IncExp.value,
                    UserId:args.IncExp.UserId,
                    verified:args.IncExp.verified,
                    verifiedBy:args.IncExp.verifiedBy,
                })
                return {
                    ok:true,
                    event
                  }
            }catch(e){
                return {
                    ok: false,
                    errors: formatErrors(e,models)
                  }
            }

        }
    }
}