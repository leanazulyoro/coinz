import React from 'react';
import config from 'isomorphic-config';
import { Helmet } from 'react-helmet';
import project from '../../webpack/config';
import saferstringify from 'safer-stringify';
import HtmlBuilder from './builder/HtmlBuilder';
import { renderToStaticMarkup } from 'react-dom/server';

const staticSuffix = project.build_number ? `-${project.build_number}` : '';

const renderHtml = (markup, client) => {

  const helmet = Helmet.renderStatic();

  let htmlBuilder = (new HtmlBuilder)
    .withBodyAttrs(helmet.htmlAttributes.toComponent())
    .withHtmlAttrs(helmet.bodyAttributes.toComponent())
    .withHelmet(helmet.title.toComponent())
    .withHelmet(helmet.meta.toComponent())
    .withHelmet(helmet.link.toComponent())
    .withHelmet(helmet.noscript.toComponent())
    .withHelmet(helmet.script.toComponent())
    .withHelmet(helmet.style.toComponent())
    .withFooterTag('script', { charSet: 'UTF-8' }, `window.__APOLLO_STATE__=${saferstringify(client ? client.extract() : {})};`)
    .withFooterTag('script', { charSet: 'UTF-8' }, `var CONFIG=${JSON.stringify({ client: config.client })};`)
    .withFooterTag('script', { defer: true, src: config.client.cdn_static_url + `/vendor.bundle${staticSuffix}.js` })
    .withFooterTag('script', { defer: true, src: config.client.cdn_static_url + `/main.bundle${staticSuffix}.js` })
    .withMarkup(<main
      id='root'
      dangerouslySetInnerHTML={{ __html: markup }} // eslint-disable-line react/no-danger
    />);

  const html = renderToStaticMarkup(htmlBuilder.build());
  return `${html}`;

};

export default renderHtml;
