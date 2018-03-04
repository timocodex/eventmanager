export default `
scalar ForumObject
type Forum {
  id:ID!
  title:String
  content:String
  createdAt:String
  updatedAt:String
}
type ForumResponse {
  ok: Boolean!
  forum: Forum
  errors: [Error!]
}
type Query {
  forums(EventId:String!):[Forum]
}
type Mutation {
  addForum(forum:ForumObject): ForumResponse
}
`;