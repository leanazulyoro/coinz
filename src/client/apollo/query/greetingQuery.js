import gql from 'graphql-tag';

export const GREETING_QUERY = gql`
query Greeting {
  greeting @client {
    text
    __typename
  }
}`;
