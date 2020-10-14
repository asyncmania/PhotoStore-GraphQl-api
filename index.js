const { ApolloServer } = require("apollo-server");

const typeDefs = `
#1. Add Phot0 type defination
  type Photo {
    id: ID!,
    url: String!,
    name: String!,
    description: String
  }

  # 2.Return Photo from allPhoto

  type Query{
    totalPhotos: Int!
    allPhotos: [Photo!]!
  }

  type Mutation {
    postPhoto(name: String! description: String): Photo!
  }
`;

let _id = 0

const photos = [];

const resolvers = {
  Query: {
    totalPhotos: () => photos.length,
    allPhotos: () => photos
  },
  Mutation: {
    postPhoto(parent, args) {
     const newPhoto = {
       id: _id++,
       ...args
     }
     photos.push(newPhoto)
     return newPhoto
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server
  .listen()
  .then(({ url }) => console.log(`GraphQL service running on ${url}`));
