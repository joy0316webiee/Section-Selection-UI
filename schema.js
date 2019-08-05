exports.typeDefs = `
  type ScreenImageType {
    screenWidth: Int!
    screenHeight: Int!
    image: String!
  }

  input SectionBox {
    x1: Int
    y1: Int
    x2: Int
    y2: Int
  }

  type BaseMutationResponse {
    error: Boolean
    message: String
  }

  type Query {
    urlScreen(url: String!): ScreenImageType!
  }

  type Mutation {
    urlBoxSelection(url: String!, coordinates: SectionBox): BaseMutationResponse
  }
`;
