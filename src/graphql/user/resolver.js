import gen from '../../helpers/idGenerator'
import formatErrors from '../../helpers/formatErrors';
import { tryLogin,createTokens } from '../../helpers/auth';
import GraphQLJSON from 'graphql-type-json';

exports.resolver ={
  Query: {
    users: (root,args,{models})=>{
      console.log(root)
      return models.User.findAll()
    },
    user:(root,args,{models})=>{
      return models.User.findById(args.UserId)
    }
  },
  // User:{
  //   role:(root) =>{
  //     return root.getRole()
  //   }
  // },
  Member:{
    role: async (root) =>{
      let a = await root.getRoles()
      return a[0]
    }
  },
  UserObject: GraphQLJSON,
  Mutation: {
    addUser: async (root,args,{models,SECRET,SECRET2}) =>{
      try{
        let profilePicture = args.user.profilePicture?args.user.profilePicture:'https://mbevivino.files.wordpress.com/2011/08/silhouette_default.jpg'
        const user = await models.User.create({
          id:gen(),
          password:args.user.password,
          email:args.user.email,
          firstName:args.user.firstName,
          lastName:args.user.lastName,
          profilePicture
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