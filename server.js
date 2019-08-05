const { Server } = require('http');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { execute, subscribe } = require('graphql');
const express = require('express');
const cors = require('cors');

// Bring in GraphQL-Express Middleware
const { graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

// Initialize application
const app = express();

// Set Cors Options
const corsOptions = {
  origin: 'http://localhost:3000'
};

app.use(cors(corsOptions));

// Create GraphiQL application
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// Making plain HTTP server for Websocket usage
const server = Server(app);

// GraphQL Websocket definition
SubscriptionServer.create(
  {
    schema,
    execute,
    subscribe
  },
  {
    server: server,
    path: '/api/ws'
  }
);

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
