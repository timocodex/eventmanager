import gen from '../helpers/idGenerator'
import formatErrors from '../helpers/formatErrors';
import { tryLogin,createTokens } from '../helpers/auth';
import GraphQLJSON from 'graphql-type-json';

export default {
  Query: {
    users: (root,args,{models})=>{
      console.log(root)
      return models.User.findAll()
    },
  },
//   User:{
//     news:(user) =>{
//       return user.getNews()
//     }
//   },
  UserObject: GraphQLJSON,
  Mutation: {
    addUser: async (root,args,{models,SECRET,SECRET2}) =>{
      try{
        const user = await models.User.create({
          id:gen(),
          password:args.user.password,
          email:args.user.email,
          firstName:args.user.firstName,
          lastName:args.user.lastName,
        })
        const refreshTokenSecret = user.password + SECRET2;
        const [token, refreshToken] = await createTokens(user, SECRET, refreshTokenSecret);
        return {
          ok:true,
          user,
          token,
          refreshToken
        }
      }catch(e){
        return {
          ok: false,
          errors: formatErrors(e,models)
        };
      }
    },
    login: async(root,{email,password},{models,SECRET,SECRET2}) =>
      tryLogin(email, password, models, SECRET, SECRET2),
  },
};