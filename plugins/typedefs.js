const graphqlUtils = require('@graphql-tools/utils')
const graphql = require('graphql')

function print(schema) {
  const parsedSchema = schema.replace(/"""([\s\S]*?)"""/g, "")

  return `import { gql } from "@apollo/client/core"

export const typeDefs = gql\`
${parsedSchema}
  \`;
`
}

module.exports = {
  plugin: (schema) => print(graphqlUtils.printSchemaWithDirectives(schema))
}
