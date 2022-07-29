var express = require("express");
var { graphqlHTTP } = require("express-graphql");
const cors = require("cors");

var schema = require("./schema");

var app = express();
app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,

    graphiql: true,
  })
);
app.listen(4000, () => console.log("Now browse to localhost:4000/graphql"));
