import React from 'react';
import Html from '../components/Html';

class HtmlBuilder {

  _htmlAttrs;
  _bodyAttrs;
  _helmet;
  _markup;
  _headTags;
  _footerTags;

  constructor() {
    this._htmlAttrs = null;
    this._bodyAttrs = null;
    this._helmet = [];
    this._headTags = [];
    this._footerTags = [];
    this._markup = null;
  }

  withHtmlAttrs(htmlAttrs) {
    this._htmlAttrs = htmlAttrs;
    return this;
  }

  withBodyAttrs(bodyAttrs) {
    this._bodyAttrs = bodyAttrs;
    return this;
  }

  withHelmet(helmet) {
    this._helmet.push(helmet);
    return this;
  }

  withHeadTag(type, attributes, innerText) {
    const tag = {
      type,
      attributes,
      innerText

    };
    this._headTags.push(tag);
    return this;
  }

  withFooterTag(type, attributes, innerText) {
    const tag = {
      type,
      attributes,
      innerText

    };
    this._footerTags.push(tag);
    return this;
  }

  withMarkup(markup) {
    this._markup = markup;
    return this;
  }

  _createTag = (tag, i) => {
    if (typeof tag.innerText !== 'undefined') {
      return <tag.type {...tag.attributes} key={i} dangerouslySetInnerHTML={{ __html: tag.innerText }} />;
    } else {
      return <tag.type {...tag.attributes} key={i} />;
    }
  };

  build() {
    const htmlAttrs = this._htmlAttrs;
    const bodyAttrs = this._bodyAttrs;
    const markup = this._markup;
    const helmet = this._helmet;

    let headTags = [];
    if (this._headTags.length > 0) {
      headTags = this._headTags.map((tag, i) => this._createTag(tag, i));
    }

    let footerTags = [];
    if (this._footerTags.length > 0) {
      footerTags = this._footerTags.map((tag, i) => this._createTag(tag, i));
    }

    return (<Html
      htmlAttrs={htmlAttrs}
      bodyAttrs={bodyAttrs}
      head={helmet.concat(headTags)}
      footer={footerTags}
    >{markup}</Html>);
  }
}

export default HtmlBuilder;
