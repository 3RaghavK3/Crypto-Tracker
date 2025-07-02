import  { createContext, useState, useEffect } from 'react';

// @ts-ignore
export const footercontext = createContext();

export const FooterProvider = ({ children }) => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(100);

  useEffect(() => {
    goToTop();
  }, [page]);

  function goToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  return (
    <footercontext.Provider value={{ page, setPage, perPage, setPerPage }}>
      {children}
    </footercontext.Provider>
  );
};
