import express, { NextFunction, Request, Response } from 'express';
import SQLController from './controllers/SQLController';
import GQLController from './controllers/GQLController';
const { makeExecutableSchema } = require('graphql-tools');


const router = express.Router();
const { graphqlHTTP } = require('express-graphql');
// const schema = require('./schema.js');
let schema = '';

router.get(
  '/submit',
  SQLController.getAllMetadata,
  SQLController.formatQueryResult,
  GQLController.createSchemaTypeDefs,
  GQLController.createSchemaQuery,
  GQLController.createSchemaMutation,
  GQLController.createResolver,
  (req: Request, res: Response) => {
    // cache (for SQL visualizer)
    // finalString (GraphQL Schema)
    // resolverString (GraphQL Resolver)
    return res.status(200).json(res.locals);
  },
);
// format finalString to code


// console.log('schemaObj in routerjs', schemaObj);
// const typeDefs = schemaObj.

// const schema = makeExecutableSchema({
//   typeDefs,
//   resolvers,
//   // allowUndefinedInResolve: false,
//   // resolverValidationOptions: {
//   //   // requireResolversForArgs: 'error',
//   //   // requireResolversForAllFields: 'warn',
//   // },
// });

const defaultQueryString = `
# Welcome to GraphiQL
#
# GraphiQL is an in-browser tool for writing, validating, and
# testing GraphQL queries.
#
# Type queries into this side of the screen, and you will see intelligent
# typeaheads aware of the current GraphQL type schema and live syntax and
# validation errors highlighted within the text.
#
# GraphQL queries typically start with a "{" character. Lines that start
# with a # are ignored.
#
# Here's an example query to get started:
#
# To get a list of all PEOPLE by name and gender, use the following QUERY:
#
# { 
#  people {
#    name
#    gender
#   }
# }
#
# To add a person to the database, use the following MUTATION:
#
# mutation {
#    addPerson(gender: "Male", name: "John", species_id: 11){
#       name
#       gender
#       species {
#           name
#       }
#    }
# }
`;

router.use(
  '/sandbox',
  SQLController.getAllMetadata,
  SQLController.formatQueryResult,
  GQLController.createSchemaTypeDefs,
  GQLController.createSchemaQuery,
  GQLController.createSchemaMutation,
  GQLController.createResolver,
  (req: Request, res: Response, next: NextFunction) => {
    // cache (for SQL visualizer)
    // finalString (GraphQL Schema)
    // resolverString (GraphQL Resolver)
    // schemaObj.finalSres.locals;
    console.log('before typedefs, resolvers');

    const typeDefs = res.locals.finalString;
    const resolvers = eval(res.locals.resolverString);

    console.log('before parse');    
    // const test = JSON.parse(resolvers);
    console.log('typeDefs', typeDefs);

    // console.log('resolvers', eval(resolvers));
    console.log('resolvers typeof', typeof resolvers); // returns string

    schema = makeExecutableSchema({
      typeDefs,
      resolvers
    });

    console.log('afterwards')
    console.log('schema', schema);

    // res.locals.schema = schema;
   
    // return res.status(200).json(res.locals);
    // console.log('schemaObj inside sandbox route', schemaObj);
    return next();
  },
  graphqlHTTP({
    // schema (types of queries, mutations, types) + resolvers
    schema,
    graphiql: {
      editorTheme: 'solarized light',
      defaultQuery: defaultQueryString,
    },
  }),
  
);

export default router;