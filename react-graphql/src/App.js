import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Courses from './courses';

import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
// First ApolloClient is imported from the apollo-boost library.
// A new instance of ApolloClient is created and stored in client. 
// To create a new instance of ApolloClient you need to pass a configuration object to the constructor. 
// This object must contain the uri property.
// The value of this property must be replaced which the URI of the GraphQL endpoint which should be accessed.
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

const App = () => (
  <ApolloProvider client={client}>
    <div className="container">
      <nav className="navbar navbar-dark bg-primary">
        <span className="navbar-brand">React and GraphQL - Sample Application</span>
      </nav>
      <div>
        <Courses />
      </div>
    </div>
  </ApolloProvider>
);

export default App;
