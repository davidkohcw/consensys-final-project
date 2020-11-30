import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { gql } from '@apollo/client';


// Invariant Violation:
// "fetch" has not been found globally and no fetcher has been configured. To fix this, install a fetch package (like https://www.npmjs.com/package/cross-fetch), instantiate the fetcher, and pass it into your HttpLink constructor. For example:

// import fetch from 'cross-fetch';
// import { ApolloClient, HttpLink } from '@apollo/client';
// const client = new ApolloClient({
//   link: new HttpLink({ uri: '/graphql', fetch })
// });

// http://localhost:8000/subgraphs/name/davidkohcw/infinitegraph/graphql
import fetch from 'cross-fetch';
const client = new ApolloClient({
    link: new HttpLink({ uri: 'http://localhost:8000/subgraphs/name/davidkohcw/infinitegraph', fetch }),

    cache: new InMemoryCache()
});



// query {exampleEntities{
//     id
//     purchaser
//     count
//   }}


client.query({
    query: gql`query {exampleEntities{
        id
        purchaser
        count
      }}`
}).then(result => console.log(result["data"]["exampleEntities"])).catch(result => console.log(result));