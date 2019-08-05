import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { SubscriptionClient } from 'subscriptions-transport-ws';

import App from './pages/App';

// Create WebSocket client
const WSClient = new SubscriptionClient(`ws://localhost:4000/api/ws`, {
  reconnect: true
});

const link = new WebSocketLink(WSClient);
const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
