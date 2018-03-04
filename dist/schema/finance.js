"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = `
type Finance {
  id: ID!
  income:[IncomeExpense]
  expense:[IncomeExpense]
  createdAt:String
  updatedAt:String
}
`;