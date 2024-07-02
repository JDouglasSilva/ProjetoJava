//"app/front/src/contexts/LanguageContext.js"

import React, { createContext, useState, useEffect } from 'react';
import { EN } from '../assets/i18n/en';
import { PT } from '../assets/i18n/pt';
import { ES } from '../assets/i18n/es';

// Mapeia a tradução utilizada
const translations = {
  en: EN,
  pt: PT,
  es: ES
};

// Cria o "Dicionario" que vai ser utilizado
export const LanguageContext = createContext();

// Define o provedor de contexto de idioma
export const LanguageProvider = ({ children }) => {
  // Idioma atual (padrão é 'en' para inglês)
  const [language, setLanguage] = useState('en');
  // Usa o .js da linguaem utilizada
  const [strings, setStrings] = useState(translations[language]);

  // EAtualzia tradução quando idioma mudar
  useEffect(() => {
    setStrings(translations[language]);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, strings }}>
      {children} {/* Renderiza os componentes filhos */}
    </LanguageContext.Provider>
  );
};
