// src/templates/noticias/old-news-redirect-template.js

import React, { useEffect } from "react";
import { navigate } from "gatsby";

const OldNewsRedirect = ({ pageContext }) => {
  useEffect(() => {
    if (pageContext.redirectUrl) {
      navigate(pageContext.redirectUrl);
    }
  }, [pageContext.redirectUrl]);

  return null;
};

export default OldNewsRedirect;