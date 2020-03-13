const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path')
const config = require('dotenv').config()

fetch(config.parsed.API_URL, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    variables: {},
    query: `
      {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `,
  }),
})
  .then(result => result.json())
  .then(result => {
    // here we're filtering out any type information unrelated to unions or interfaces
    const filteredData = result.data.__schema.types.filter(
      type => type.possibleTypes !== null,
    );
    result.data.__schema.types = filteredData;
    fs.writeFileSync('./../..//data/introspection.json', JSON.stringify(result.data), err => {
      if (err) {
        process.stderr.write('Error writing schema fragmentTypes file', err);
      } else {
        process.stdin.write('Fragment types successfully extracted!');
      }
    });
  });
