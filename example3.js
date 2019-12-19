const express = require('express');
const graphQLHTTP = require('express-graphql'); // for graphql server
const { GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLInt, GraphQLString, graphql } = require('graphql'); //we are importing some tools and methods from graphql module 

const users = [
    { id: 1, name: "Majid Ashraf", number: 132 },
    { id: 4, name: "Haider Ali", number: 456 },
    { id: 5, name: "Ali Mughal", number: 789 },
    { id: 3, name: "Wajid", number: 741 },
]

const UserType = new GraphQLObjectType({
    name: "users", // you can write anything else in name property but it will be better if you put schema name
    fields: {
        id: {
            type: GraphQLInt
        },
        name: {
            type: GraphQLString
        },
        number: {
            type: GraphQLInt
        }
    }
}); // there will be define type of schema

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: () => ({
            users: {
                type: new GraphQLList(UserType),
                resolve: () => {
                    return users;
                }
            },
            user: {
                type: UserType,
                args: {
                    id: {
                        type: GraphQLInt
                    }
                },
                resolve: (parent, { id }) => {
                    const user = users.filter(user => user.id === id);
                    return user[0];
                }
            }
        })
    })
}); // there is making simple graphql schema
const port = 3000;
const app = express();


app.use("/graphql", graphQLHTTP({ schema, graphiql: true })); 
// using route called graphql and graphQLHTTP method to need to use graphql schema what I made above called schema
// you can hit http://localhost:3000/graphql


app.get("/", (req, res) => {
    const schemaQuery = "{ users { id name } }";
    const query = `query ${schemaQuery}`;
    graphql(schema, schemaQuery, query)
        .then((response) => {
            res.send(response);
        }).catch((error) => {
            res.send(error);
        })

})

app.get("/:id", (req, res) => {
    const schemaQuery = `{ user(id : ${req.params.id}) { id name } }`;
    const query = `query ${schemaQuery}`;
    graphql(schema, schemaQuery, query)
        .then((response) => {
            res.send(response);
        }).catch((error) => {
            res.send(error);
        })

})



















app.listen(port, () => console.log(`Server is running on http://localhost:${port}`))