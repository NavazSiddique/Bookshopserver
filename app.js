const express = require('express')
var { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema')
const cors = require("cors");




var app = express();
app.use(cors());
app.use('/graphql', graphqlHTTP({
 schema,
 graphiql:true
}));
app.listen(4002, () => console.log('Now browse to localhost:4002/graphql'));