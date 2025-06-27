import React, { createContext, useState } from "react";

export const footercontext = createContext();

export const FooterProvider = ({ children }) => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(100);

  return (
    <footercontext.Provider value={{ page, setPage, perPage, setPerPage }}>
      {children}
    </footercontext.Provider>
  )
}