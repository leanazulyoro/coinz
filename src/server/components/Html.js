import React from 'react';
import PropTypes from 'prop-types';

const Html = (props) => {
  return (
    <html {...props.htmlAttrs}>
      <head>
        {props.head}
      </head>
      <body {...props.bodyAttrs}>
        {props.children}
        {props.footer}
      </body>
    </html>
  );
};

Html.propTypes = {
  htmlAttrs: PropTypes.object,
  head: PropTypes.array,
  bodyAttrs: PropTypes.object,
  children: PropTypes.object,
  footer: PropTypes.array
};

export default Html;
