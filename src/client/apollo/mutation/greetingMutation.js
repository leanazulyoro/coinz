import gql from 'graphql-tag';

export const ADD_GREETING = gql`
 mutation addGreeting($text: String) {
  addGreeting(text: $text) @client
 }
`;

export const REMOVE_GREETING = gql`
 mutation removeGreeting() {
  removeGreeting() @client
 }
`;
