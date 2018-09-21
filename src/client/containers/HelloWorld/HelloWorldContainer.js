import React from 'react';
import { Query } from 'react-apollo';
import { GREETING_QUERY } from '../../apollo/query/greetingQuery';
import HelloWorld from '../../components/HelloWorld/HelloWorld';

const HelloWorldContainer = (props) => (
  <Query query={GREETING_QUERY} >
    {(result) => {
      if (result.loading) return <div>Cargando...</div>;
      if (result.error) return <div>Error!</div>;
      return (
        <HelloWorld greeting={result.data.greeting.text} />
      )
    }}
  </Query>
);

export default HelloWorldContainer;
