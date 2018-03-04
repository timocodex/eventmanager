exports.schema =`
scalar DivisionObject
type Division {
    id:ID
    name:String
    members:[Member]
}
type DivisionResponse {
    ok: Boolean!
    division: Division
    errors: [Error!]
  }
`
exports.query = `
divisions(EventId:String!):[Division]
`
exports.mutation = `
addDivision(division:DivisionObject):DivisionResponse
`