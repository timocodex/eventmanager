exports.schema =`
scalar IncExpObject
type IncomeExpense {
  id: ID!
  picture:String
  isIncome:Boolean
  value:Int
  user:User
  verified:Boolean
  verifiedBy:User
  createdAt:IncExpObject
  updatedAt:IncExpObject
}
type IncExpResponse {
  ok: Boolean!
  event: IncomeExpense
  errors: [Error!]
}
`
exports.mutation =`
addIncExp(IncExp:IncExpObject): IncExpResponse
`