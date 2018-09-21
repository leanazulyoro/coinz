import config from 'isomorphic-config';
import renderHtml from '../renderHtml';
import getClient from '../apollo/apolloClientForServer';
import { ApolloProvider, renderToStringWithData } from 'react-apollo';
import { StaticRouter } from 'react-router';
import Routes from '../../client/routes';
import { renderToStaticMarkup } from 'react-dom/server';
import React from 'react';


const serverRender = function(req, res, next) {
  if (config.server.server_render === true) {
    const context = {};

    const client = getClient();

    const component = (
      <ApolloProvider client={client}>
        <StaticRouter
          location={req.url}
          context={context}
        >
          <Routes />
        </StaticRouter>
      </ApolloProvider>
    );

    renderToStringWithData(component)
      .then(content => {
        const statusCode = 200;
        const html = renderHtml(content, client);
        res.status(statusCode);
        res.send(html);
        res.end();
      })
      .catch(e => {
        console.error('SERVER RENDERING ERROR:', e);
        const statusCode = 500;
        const html = renderToStaticMarkup(<div>Server Error</div>);
        res.status(statusCode);
        res.send(html);
        res.end();
      });
  }
  else {
    next();
  }
}

module.exports = serverRender;
