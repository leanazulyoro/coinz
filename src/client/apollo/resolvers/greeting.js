import { GREETING_QUERY } from '../query/greetingQuery';

export const defaults = {
  greeting: {
    text: '',
    __typename: 'greeting'
  }
};

const addGreeting = (_, { text }, { cache }) => {
  const newData = {
    greeting: {
      text,
      __typename: 'greeting'
    }
  };

  cache.writeQuery({ query: GREETING_QUERY, data: newData });
  return newData;
};

const removeGreeting = (_, __, { cache }) => {
  const newData = {
    greeting: {
      text: '',
      __typename: 'greeting'
    }
  };
  cache.writeQuery({ query: GREETING_QUERY, data: newData });
  return newData;
};

export const resolvers = {
  Mutation: {
    addGreeting,
    removeGreeting
  }
};
