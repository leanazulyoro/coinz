import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HelloWorldContainer from './containers/HelloWorld/HelloWorldContainer';

const Routes = () => (
  <Switch>
    <Route exact path="/" render={
      (props) => (
        <HelloWorldContainer />
      )
    } />
  </Switch>
);

export default Routes;
