const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(`
    type Book{
        title: String,
        author: String
    }

    type Query {
        books: [Book]
    }
`);

const root = { books: () => [] };

const app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Now browse to localhost:${PORT}/graphql`));