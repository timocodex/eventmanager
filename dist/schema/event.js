"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = `
scalar EventObject
type Event {
  id:ID!
  title:String
  content:String
  pictures:[File]
  members:[User]
  finances:[Finance]
  createdAt:String
  updatedAt:String
  eventDate:String
}
type EventResponse {
  ok: Boolean!
  event: Event
  errors: [Error!]
}
type Query {
  events: [Event]
}
type Mutation {
  addEvent(event:EventObject): EventResponse
}
`;