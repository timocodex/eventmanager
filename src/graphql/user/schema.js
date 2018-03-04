exports.schema =`
scalar UserObject
type User {
  id:ID!
  email:String!
  firstName:String
  lastName:String
  profilePicture:String
  createdAt:String
  updatedAt:String
}
type Member{
    id:ID!
    email:String!
    firstName:String
    lastName:String
    role:Role
    profilePicture:String
    createdAt:String
    updatedAt:String
}
type RegisterResponse {
  ok: Boolean!
  user: User
  token: String
  refreshToken: String
  errors: [Error!]
}
type LoginResponse {
  ok: Boolean!
  user:User
  token: String
  refreshToken: String
  errors: [Error!]
}
`
exports.query =`
  users: [User]
  user(UserId:ID): User
`
exports.mutation=`
  addUser(user:UserObject): RegisterResponse
  login(email:String!,password:String!):LoginResponse
 `
