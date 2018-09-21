import React from "react";
import renderHtml from "../renderHtml";

const clientRender = function(req, res) {
    const statusCode = 200;
    const html = renderHtml("");
    res.status(statusCode);
    res.send(html);
    res.end();
};

module.exports = clientRender;
