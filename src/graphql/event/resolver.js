import gen from '../../helpers/idGenerator'
import formatErrors from '../../helpers/formatErrors';
import GraphQLJSON from 'graphql-type-json';
import DataLoader from 'dataloader'

exports.resolver={
    Query: {
      events: async (root,args,{models})=>{
        if(args.UserId){
            console.log(args)
            let uDivision = await models.UserDivisionRole.findAll({where:{UserId:args.UserId}})
            let allEvent =[]
            if(uDivision.length>0){
                for(let i =0,n= uDivision.length;i<n;i++){
                    let x = uDivision[i]
                    let div = await models.Division.findById(x.DivisionId)
                    let event = await models.Event.findById(div.EventId)
                    let role = await models.Role.findById(x.RoleId)
                    let obj = Object.assign(event,{myRole:role.name})
                    allEvent.push(obj)
                }
            }
            return allEvent
        }else{
            return models.Event.findAll()
        }
      },
    },
    Event:{
      title: ({title}) => title.toUpperCase(),
      management:async (root) =>{
        let division = await root.getDivisions({where:{name:"management"}})
        return division[0]
      },
      divisions: async (root,args,{models})=>{
         return await root.getDivisions({where:{name:{$not:"management"}}})
      },
    //   myRole:async (root,args,{models})=>{
    //       return root.members
    //     //let uEvent =  await models.UserEvent.findOne({where:{UserId:,EventId:root.id}}) 
    //   },
      pictures: async (root) =>{
          return root.getFiles()
      },
    //   members: (root,args,{models}) =>{
    //     // const findByUserLoader = new DataLoader(Promise.resolve(root.getUsers()));
    //     // return findByUserLoader.load(root)
    //     return root.getUsers()
    //   },
      incomeExpense:(root) =>{
        return root.getIncomeExpenses()
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
          const divisi = await models.Division.create({
            id:gen(),
            name:'management',
            EventId:event.id
          })
          const userDiv = await models.UserDivisionRole.create({
            id:gen(),
            UserId:args.event.UserId,
            RoleId:findAdmin.id,
            DivisionId:divisi.id
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