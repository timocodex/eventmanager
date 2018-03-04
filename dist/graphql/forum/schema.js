"use strict";

exports.schema = `
scalar ForumObject
type Forum {
  id:ID!
  title:String
  content:String
  createdAt:ForumObject
  updatedAt:ForumObject
}
type ForumResponse {
  ok: Boolean!
  forum: Forum
  errors: [Error!]
}
`;
exports.query = `
 forums(EventId:String!):[Forum]
`;
exports.mutation = `
  addForum(forum:ForumObject): ForumResponse
`;