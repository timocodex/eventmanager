export default `
type Finance {
  id: ID!
  income:[IncomeExpense]
  expense:[IncomeExpense]
  createdAt:String
  updatedAt:String
}
`