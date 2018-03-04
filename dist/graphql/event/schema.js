"use strict";

exports.schema = `
scalar EventObject
type Event {
  id:ID!
  title:String
  content:String
  pictures:[File]
  management:Division
  divisions:[Division]
  incomeExpense:[IncomeExpense]
  createdAt:EventObject
  updatedAt:EventObject
  eventDate:EventObject
  myRole:String
}
type EventResponse {
  ok: Boolean!
  event: Event
  errors: [Error!]
}
`;
exports.query = `
 events(UserId:ID): [Event]
`;
exports.mutation = `
 addEvent(event:EventObject): EventResponse
`;