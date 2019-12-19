const express = require('express');
const graphQLHTTP = require('express-graphql'); // for graphql server
const { graphql, buildSchema } = require('graphql'); //we are importing some tools and methods from graphql module 
const bodyParser = require('body-parser');
const cors = require('cors')
const port = 4000;
const coursesData = [
    {
        id: 1,
        title: 'The Complete Node.js Developer Course',
        author: 'Andrew Mead, Rob Percival',
        description: 'Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!',
        topic: 'Node.js',
        url: 'https://codingthesmartway.com/courses/nodejs/'
    },
    {
        id: 2,
        title: 'Node.js, Express & MongoDB Dev to Deployment',
        author: 'Brad Traversy',
        description: 'Learn by example building & deploying real-world Node.js applications from absolute scratch',
        topic: 'Node.js',
        url: 'https://codingthesmartway.com/courses/nodejs-express-mongodb/'
    },
    {
        id: 3,
        title: 'JavaScript: Understanding The Weird Parts',
        author: 'Anthony Alicea',
        description: 'An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own framework, and more.',
        topic: 'JavaScript',
        url: 'https://codingthesmartway.com/courses/understand-javascript/'
    }
]

const getCourse = (args) => {
    if (args.id) {
        let id = args.id;
        return coursesData.filter(course => {
            return course.id === id;
        })[0]
    } else {
        return coursesData;
    }
}

const getCourses = (args) => {
    if (args.topic) {
        let topic = args.topic;
        return coursesData.filter(course => course.topic === topic);
    } else {
        return coursesData;
    }
}

// there is start new work with graphql==============

// just making root object
const root = {
    course: getCourse,
    courses: getCourses
};

const schema = buildSchema(`
type CourseWith4Properties {
    id: Int
    author: String
    description: String
    topic: String
}
type Course {
    id: Int
    title: String
    author: String
    description: String
    topic: String
    url: String
}
type Query {
    course(id: Int): CourseWith4Properties
    courses(topic: String): [Course]
},
`);

// // Create an express server and a GraphQL endpoint
const app = express();
app.use('/graphql', cors(), bodyParser.json(), graphQLHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));


// app.get("/", (req, res) => {
//     let query = `{ courses { topic id  author description } }`;
//     graphql(schema, query, root)
//         .then((response) => {
//             res.send(response);
//         }).catch((error) => {
//             res.send(error);
//         })

// })


app.listen(port, () => console.log(`Express GraphQL Server Now Running On localhost:${port}/graphql`));