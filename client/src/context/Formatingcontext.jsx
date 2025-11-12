import { createContext } from 'react';
// @ts-ignore
export const FormatContext = createContext(null);

export const FormatProvider = ({ children }) => {
  const formatnumber = (value, currency_name, notation = 'standard') => {
    if(notation=='standard'){
            notation=String(Math.floor(value)).length > 9 ? 'compact' : notation;
    }
    
    return Intl.NumberFormat(currency_name == 'usd' ? 'en-US' : 'en-IN', {
      notation,
      maximumFractionDigits:2,
    }).format(value);
  };

  return <FormatContext.Provider value={{ formatnumber }}>{children}</FormatContext.Provider>;
};
