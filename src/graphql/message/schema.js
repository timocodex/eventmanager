exports.schema = `
    scalar MessageObject
    type Message {
        id:ID!
        content:String
        user:User
        ForumId:ID
        createdAt:String
        updatedAt:String
    }

    type MessageResponse {
        ok: Boolean!
        message: Message
        errors: [Error!]
      }
`
exports.query =`
    messages(ForumId:ID): [Message]
`
exports.mutation =`
    addMessage(message:MessageObject): MessageResponse
`