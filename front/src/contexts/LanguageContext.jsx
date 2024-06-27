import React, { createContext, useState, useEffect } from 'react';
import { EN } from '../assets/i18n/en';
import { PT } from '../assets/i18n/pt';

const translations = {
  en: EN,
  pt: PT
};

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [strings, setStrings] = useState(translations[language]);

  useEffect(() => {
    setStrings(translations[language]);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, strings }}>
      {children}
    </LanguageContext.Provider>
  );
};
